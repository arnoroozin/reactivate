import { Grid, GridColumn } from 'semantic-ui-react'

import ActivityList from './ActivityList'
import { UseStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import LoadingComponent from '../../../layout/LoadingComponent'
import ActivityFilters from './ActivityFilters'

export default  observer(function ActivityDashboard() {
  const {activityStore}=UseStore();

 

  useEffect(() => {
    activityStore.loadActivities();
    
  }, [activityStore]);

  if (activityStore.initLoading)
    return <LoadingComponent content="Loading activities..." />;
  return (
    <>
    <Grid>
   <GridColumn width={'10'} >
   <ActivityList   />
   </GridColumn>
   <GridColumn width={'6'}>
    <ActivityFilters />
   </GridColumn>
   </Grid>
    </>
  )
})

