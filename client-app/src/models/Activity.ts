import Profile from "./Profile";

export interface IActivity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  isCancelled: boolean;
  hostUsername: string;
  attendees?: Profile[];
  isHost:boolean;
  isGoing:boolean;
  host?:Profile;
}
export class Activity implements IActivity{
constructor(init:ActivityFormValues){
    this.id=init.id!;
    this.title=init.title;
    this.category=init.category;
    this.city=init.city;
    this.date=init.date;
    this.description=init.description;
    this.venue=init.venue;
   

}
    id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  isCancelled: boolean=false;
  hostUsername: string='';
  attendees?: Profile[];
  isHost:boolean=false;
  isGoing:boolean=false;
  host?:Profile;
}
export class ActivityFormValues{
    id?: string=undefined;
    title: string='';
    date: Date | null=null;
    description: string='';
    category: string='';
    city: string='';
    venue: string='';
    constructor(activity?:ActivityFormValues){
       if (activity) {
        this.id=activity.id;
        this.title=activity.title;
        this.category=activity.category;
        this.city=activity.city;
        this.date=activity.date;
        this.description=activity.description;
        this.venue=activity.venue;
       }
        

    }

}
