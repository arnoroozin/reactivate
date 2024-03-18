import { Grid, GridColumn } from 'semantic-ui-react'

import ActivityList from './ActivityList'
import { UseStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import LoadingComponent from '../../../layout/LoadingComponent'

export default  observer(function ActivityDashboard() {
  const {activityStore}=UseStore();

 

  useEffect(() => {
    activityStore.loadActivities();
    
  }, [activityStore]);

  if (activityStore.initLoading)
    return <LoadingComponent content="Loading app" />;
  return (
    <>
    <Grid>
   <GridColumn width={'10'} >
   <ActivityList   />
   </GridColumn>
   <GridColumn width={'6'}>
    <h2>Activity Filter</h2>
   </GridColumn>
   </Grid>
    </>
  )
})

