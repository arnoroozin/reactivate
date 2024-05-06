import { User } from "./User";

export default interface IProfile{
    userName:string;
    displayName:string;
    image?:string;
    bio?:string;
}
export class Profile implements IProfile{
    /**
     *
     */
    constructor(user:User) {
      this.displayName=user.displayName
      this.userName=user.userName
      this.image=user.image
      
        
    }
    userName:string;
    displayName:string;
    image?:string;
    bio?:string;
}