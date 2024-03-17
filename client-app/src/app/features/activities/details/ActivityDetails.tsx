import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";

import { UseStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

export default observer( function ActivityDetails() {
  const{activityStore}=UseStore();
  if(!activityStore.selectedActivity)
  return;
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
        <Button basic animated color="blue" content="Edit" onClick={()=>activityStore.openForm(activityStore.selectedActivity?.id)} />
        <Button basic animated color="grey" content="Cancel" onClick={activityStore.cancelActivity} />
      </ButtonGroup>
    </CardContent>
  </Card>
  )
})
