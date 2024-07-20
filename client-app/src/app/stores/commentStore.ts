import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ChatComment } from "../../models/ChatComment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  creatHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat?activityId=" + activityId, {
          accessTokenFactory: () => store.userStore.user?.token as string,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
        this.hubConnection.start().catch(error=>console.log('Problem stablishing connection',error));
        this.hubConnection.on('LoadComments',(comments:ChatComment[])=>
        runInAction(()=>
            {
                comments.forEach(comment=>{
                    comment.createdAt=new Date(comment.createdAt + 'Z');
                })
                this.comments=comments

            }));
        this.hubConnection.on('RecieveComment',(comments:ChatComment)=>
            runInAction(()=>{
                comments.createdAt=new Date(comments.createdAt );
                this.comments.unshift(comments);
            } ));
        
    }
  };
  stopHubConnection=()=>{
    this.hubConnection?.stop().catch(error=>console.log('Problem stablishing connection',error));
  }
  clearComment=()=>{
    this.comments=[];
    this.stopHubConnection();
  }
  addComment=async(values:{body:string,activityId?:string})=>
    {
        values.activityId=store.activityStore.selectedActivity?.id;
        try {
            this.hubConnection?.invoke("SendComment",values);
        } catch (error) {
            console.log(error);
            
        }
    }
}
