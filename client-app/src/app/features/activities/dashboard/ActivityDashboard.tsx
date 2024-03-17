import { Grid, GridColumn } from 'semantic-ui-react'

import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { UseStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'

export default  observer(function ActivityDashboard() {
  const {activityStore}=UseStore();
  return (
    <>
    <Grid>
   <GridColumn width={'10'} >
   <ActivityList   />
   </GridColumn>
   <GridColumn width={'6'}>
    {activityStore.selectedActivity && !activityStore.editMode && <ActivityDetails />}
    {activityStore.editMode && <ActivityForm />}
   </GridColumn>
   </Grid>
    </>
  )
})

