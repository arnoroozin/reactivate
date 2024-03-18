import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../../models/Activity";
import agent from "../api/agents";
import { v4 as uuid } from "uuid";

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
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
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
    activity.date = activity.date.split("T")[0];

    this.activityRegistery.set(activity.id, activity);
  };

  LoadActivity = async (id: string) => {
    this.setInitLoading(true);
    try {
      let activity = this.activityRegistery.get(id);
      if (activity) {
        this.selectedActivity = activity;
        this.setInitLoading(false);
        return activity;
      } else {
        activity = await agent.Activities.detail(id);
        if (activity) {
          this.setActivity(activity);
          this.selectedActivity = activity;

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

  EditActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistery.set(activity.id, activity);
      });
      this.selectedActivity = activity;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  CreateActivity = async (activity: Activity) => {
    try {
      this.loading = true;
      activity.id = uuid();
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistery.set(activity.id, activity);
      });
      this.selectedActivity = activity;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
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
}
