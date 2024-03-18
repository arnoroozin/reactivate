import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";

import { UseStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../layout/LoadingComponent";

export default observer( function ActivityDetails() {
  const{activityStore}=UseStore();
  const {id}=useParams();
  useEffect(()=>{
    if(id)activityStore.LoadActivity(id);

  },[id,activityStore.LoadActivity])
  
  if(!activityStore.selectedActivity)
  return <LoadingComponent/>;
  return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`}   />
    <CardContent>
      <CardHeader>{activityStore.selectedActivity?.title}</CardHeader>
      <CardMeta>
        <span >{activityStore.selectedActivity?.date}</span>
      </CardMeta>
      <CardDescription>
        {activityStore.selectedActivity?.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <ButtonGroup widths={'2'}>
        <Button as={Link} to={`/manage/${activityStore.selectedActivity.id}`}  basic animated color="blue" content="Edit"  />
        <Button  as={Link}  to='/activities' basic animated color="grey" content="Cancel" />
      </ButtonGroup>
    </CardContent>
  </Card>
  )
})
