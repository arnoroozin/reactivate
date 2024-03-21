import {  Header } from "semantic-ui-react";

import { UseStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";


export default observer( function ActivityList() {

  const { activityStore } = UseStore();

  return (
    <>
    {activityStore.groupedActivities.map(([date,activities])=>(
      <Fragment key={date}>
        <Header sub color="teal">
          {date}
        </Header>
     
            {activities.map(activity => (

              <ActivityListItem key={activity.id} activity={activity} />

            ))}
        </Fragment>
))}
   
    </>
  );
})
 