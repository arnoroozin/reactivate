import { makeAutoObservable, reaction } from "mobx";
import ServerError from "../../models/serverError";

export default class commonStore {
  errors: ServerError | null = null;
  token: string | null = localStorage.getItem('jwt');
  appLoaded = false;
  constructor() {
    makeAutoObservable(this);
    reaction(()=>this.token,
    token=>{
      if(token)
       { localStorage.setItem('jwt',token);}
      else{
      localStorage.removeItem('jwt');}
    }
  )
  }
  setError(error: ServerError) {
    this.errors = error;
  }
  setToken = (token: string | null) => {
    this.token = token;
  };
  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
