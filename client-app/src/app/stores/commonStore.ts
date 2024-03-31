import { makeAutoObservable } from "mobx";
import ServerError from "../../models/serverError";

export default class commonStore {
  errors:ServerError|null=null;
  constructor() {
    
    makeAutoObservable(this);
  }
  setError(error:ServerError){
    this.errors=error;
  }
  }

