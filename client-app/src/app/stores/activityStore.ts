import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../../models/Activity";
import agent from "../api/agents";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistery=new Map<string,Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  initLoading = true;
  loading = false;
  constructor() {
    makeAutoObservable(this);
  }

 get activities()  {
  return Array.from(this.activityRegistery.values()).sort((a,b)=> Date.parse(a.date)-Date.parse(b.date));
}


  loadActivities = async () => {
    this.setInitLoading(true);
    try {
      const data = await agent.Activities.list();
      data.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        runInAction(() => {
          this.activityRegistery.set(activity.id,activity);

        });

      });

      this.setInitLoading(false);
    } catch (error) {
      console.log(error);
      this.setInitLoading(false);
    }
  };
  setInitLoading = (state: boolean) => {
    this.initLoading = state;
  };
  openForm = (id?: string) => {
    this.editMode = false;
    id ? this.selectActivity(id) : this.cancelActivity();
    this.editMode = true;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistery.get(id);
  };

  closeForm = () => {
    this.editMode = false;
  };

  cancelActivity = () => {
    this.selectedActivity = undefined;
  };

  EditActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
      this.activityRegistery.set(activity.id,activity);});
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
      this.loading=true;
      activity.id = uuid();
    await agent.Activities.create(activity);
    runInAction(() => {
    this.activityRegistery.set(activity.id,activity);});
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
      if(this.selectedActivity?.id===id)this.cancelActivity();
      
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };
}
