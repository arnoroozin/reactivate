import { makeAutoObservable, runInAction } from "mobx";
import { Activity, ActivityFormValues } from "../../models/Activity";
import agent from "../api/agents";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../../models/Profile";

export default class ActivityStore {
  activityRegistery = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  initLoading = false;
  loading = false;
  constructor() {
    makeAutoObservable(this);
  }

  get activities() {
    return Array.from(this.activityRegistery.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }
  get groupedActivities() {
    return Object.entries(
      this.activities.reduce((activities, activity) => {
        const date = format(activity.date!, "dd MMM yyyy");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];

        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setInitLoading(true);
    try {
      const data = await agent.Activities.list();
      data.forEach((activity) => {
        this.setActivity(activity);
      });

      this.setInitLoading(false);
    } catch (error) {
      console.log(error);
      this.setInitLoading(false);
    }
  };
  private setActivity = async (activity: Activity) => {
    const user = store.userStore.user;

    if (user) {
      activity.isGoing = activity.attendees!.some(
        (a) => a.userName === user.userName
      );
      activity.isHost = activity.hostUsername === user.userName;
      activity.host = activity.attendees?.find(
        (a) => a.userName === activity.hostUsername
      );
    }

    activity.date = new Date(activity.date!);

    this.activityRegistery.set(activity.id, activity);
  };

  LoadActivity = async (id: string) => {
    this.setInitLoading(true);
    try {
      let activity = this.activityRegistery.get(id);
      if (activity) {
        runInAction(() => (this.selectedActivity = activity));
        this.setInitLoading(false);
        return activity;
      } else {
        activity = await agent.Activities.detail(id);
        if (activity) {
          this.setActivity(activity);
          runInAction(() => (this.selectedActivity = activity));

          this.setInitLoading(false);
          return activity;
        }
      }
    } catch (error) {
      console.log(error);
      this.setInitLoading(false);
    }
  };

  setInitLoading = (state: boolean) => {
    this.initLoading = state;
  };

  EditActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          const updatedActivity = {
            ...this.LoadActivity(activity.id),
            ...activity,
          };
          this.activityRegistery.set(
            activity.id,
            updatedActivity as unknown  as Activity
          );
          this.selectedActivity = updatedActivity as unknown  as Activity;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  CreateActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.userName;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);

      // runInAction(() =>
      //   this.activityRegistery.set(newActivity.id, newActivity)
      // );

      runInAction(() => (this.selectedActivity = newActivity));
    } catch (error) {
      console.log(error);
    }
  };

  DeleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistery.delete(id);
      });

      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateAttendence = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.userName !== user?.userName
            );
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistery.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };
  cancelActivityToggle=async()=>{
    this.loading=true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(()=>{
        this.selectedActivity!.isCancelled=!this.selectedActivity!.isCancelled;
        this.activityRegistery.set(this.selectedActivity!.id,this.selectedActivity!);

      })
    } catch (error) {
      console.log(error);
    }finally{
      runInAction(()=> this.loading=false);
    }
  }
  clearActivity=()=>{
    this.selectedActivity=undefined;
  }
}
