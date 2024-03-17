import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";

import { SyntheticEvent, useState } from "react";
import { UseStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";


export default observer( function ActivityList() {
  const { activityStore } = UseStore();
 const[target,setTarget]=useState('');
  function handleDeleteLoading(e:SyntheticEvent<HTMLButtonElement>,id:string){
  setTarget(e.currentTarget.name);
    activityStore.DeleteActivity(id);
  }
  

  return (
   <Segment>
    <ItemGroup divided>
{ activityStore.activities.map(activity=>(
        <Item key={activity.id}>
          
          <ItemContent>
            <ItemHeader as='a'>{activity.title}</ItemHeader>
            <ItemMeta>{activity.date}</ItemMeta>
            <ItemDescription>
             <div> {activity.description} </div>
             <div> {activity.city},{activity.venue}</div>
            </ItemDescription>
            <ItemExtra>
                <Button floated='right' content='View' color="blue" onClick={()=>{activityStore.closeForm();activityStore.selectActivity(activity.id); }} />
                <Button loading={activityStore.loading && target===activity.id} name={activity.id} floated='right' content='Delete' color="red" onClick={(e)=>{ handleDeleteLoading(e,activity.id); }} />
                <Label basic content={activity.category} />
            </ItemExtra>
          </ItemContent>
        </Item>
        

))
}
    </ItemGroup>
    </Segment>
  );
})
 