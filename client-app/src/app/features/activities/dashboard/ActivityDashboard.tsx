import { Grid, GridColumn } from 'semantic-ui-react'

import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { Activity } from '../../../../models/Activity'

export default function ActivityDashboard({activities,selectActivity,cancelActivity,selectedActivity,editMode,openForm,closeForm,handleDeleteActivity,handleCreateOrEditActivity,submiting}:Props) {
  return (
    <>
    <Grid>
   <GridColumn width={'10'} >
   <ActivityList activities={activities} closeForm={closeForm} selectActivity={selectActivity} handleDeleteActivity={handleDeleteActivity} submiting={submiting} />
   </GridColumn>
   <GridColumn width={'6'}>
    {selectedActivity && !editMode && <ActivityDetails  openForm={openForm}  activity={selectedActivity} cancelActivity={cancelActivity} />}
    {editMode && <ActivityForm activity={selectedActivity} closeForm={closeForm} handleCreateOrEditActivity={handleCreateOrEditActivity} submiting={submiting} />}
   </GridColumn>
   </Grid>
    </>
  )
}
interface Props{
    activities:Activity[];
    cancelActivity:()=>void;
    selectedActivity:Activity|undefined;
    selectActivity:(id:string)=>void;
    openForm:(id:string)=>void;
    handleDeleteActivity:(id:string)=>void;
    closeForm:()=>void;
    editMode:boolean;
    handleCreateOrEditActivity:(activity:Activity)=>void;
    submiting:boolean;
}
