import {  Grid } from "semantic-ui-react";

import { UseStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer( function ActivityDetails() {
  const{activityStore}=UseStore();
  const {id}=useParams();
  useEffect(()=>{
    if(id)activityStore.LoadActivity(id);
    return()=>activityStore.clearActivity();
  },[id,activityStore.LoadActivity])
  
  if(!activityStore.selectedActivity)
  return <LoadingComponent/>;
  return (
    
    <Grid>
      <Grid.Column width={10}>
      <ActivityDetailedHeader activity={activityStore.selectedActivity} />
      <ActivityDetailedInfo activity={activityStore.selectedActivity}/>
      <ActivityDetailedChat activityId={activityStore.selectedActivity.id}/>
      </Grid.Column>
      <Grid.Column width={6}>
      <ActivityDetailedSidebar activity={activityStore.selectedActivity}/>
      </Grid.Column>
    </Grid>
    
  )
})
