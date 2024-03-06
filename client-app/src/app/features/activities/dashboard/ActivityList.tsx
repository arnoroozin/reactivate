import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../../models/Activity";
import { SyntheticEvent, useState } from "react";


export default function ActivityList({activities,selectActivity,closeForm,handleDeleteActivity,submiting}:Props) {
 const[target,setTarget]=useState('');
  function handleDeleteLoading(e:SyntheticEvent<HTMLButtonElement>,id:string){
  setTarget(e.currentTarget.name);
    handleDeleteActivity(id);
  }

  return (
   <Segment>
    <ItemGroup divided>
{  activities.map(activity=>(
        <Item key={activity.id}>
          
          <ItemContent>
            <ItemHeader as='a'>{activity.title}</ItemHeader>
            <ItemMeta>{activity.date}</ItemMeta>
            <ItemDescription>
             <div> {activity.description} </div>
             <div> {activity.city},{activity.venue}</div>
            </ItemDescription>
            <ItemExtra>
                <Button floated='right' content='View' color="blue" onClick={()=>{closeForm(); selectActivity(activity.id); }} />
                <Button loading={submiting && target===activity.id} name={activity.id} floated='right' content='Delete' color="red" onClick={(e)=>{ handleDeleteLoading(e,activity.id); }} />
                <Label basic content={activity.category} />
            </ItemExtra>
          </ItemContent>
        </Item>
        

))
}
    </ItemGroup>
    </Segment>
  );
}
 interface Props{
 activities:Activity[];
 selectActivity:(id:string)=>void;
 handleDeleteActivity:(id:string)=>void;
 submiting:boolean;
 closeForm:()=>void;
 }