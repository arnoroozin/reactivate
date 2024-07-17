import { makeAutoObservable, runInAction } from "mobx";
import { Photo, Profile } from "../../models/Profile";
import agent from "../api/agents";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile: boolean = false;
  uploading = false;
  loading=false;
  constructor() {
    makeAutoObservable(this);
  }
  get isCurrentUser() {
    if (this.profile && store.userStore.user)
      return store.userStore.user.userName === this.profile.userName;
    return false;
  }
  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };
  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading=false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };
  setMain=async (photo:Photo)=>{
    this.loading=true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(()=>{
        if(this.profile&&this.profile.photos){
          this.profile.photos.find(p=>p.isMain)!.isMain=false;
          this.profile.photos.find(p=>p.id===photo.id)!.isMain=true;
          this.profile.image=photo.url;
          this.loading=false;
        }
      })
      
    } catch (error) {
      console.log(error);
      runInAction(()=>this.loading=false)
    }
  }
  deletePhoto=async (id:string)=>{
    this.loading=true;
    try {
      if(this.profile&&this.profile.photos?.find(p=>p.isMain)?.id!==id){

        await agent.Profiles.delPhoto(id);
        runInAction(()=>{
          this.profile!.photos= this.profile?.photos?.filter(p=>p.id!==id);
          this.loading=false;
        })
      }
      
      
    } catch (error) {
      console.log(error);
      runInAction(()=>this.loading=false)
    }
  }
}
