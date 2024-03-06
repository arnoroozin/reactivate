import { useEffect, useState } from "react";

import { Container } from "semantic-ui-react";
import { Activity } from "../../models/Activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agents";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState< Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);


  function openForm(id?: string) {
    setEditMode(false);
    id ? selectActivity(id) : cancelActivity();
    setEditMode(true);
  }
  function closeForm() {
    setEditMode(false);
  }

  function selectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }
  function cancelActivity() {
    setSelectedActivity(undefined);
  }
  function handleDeleteActivity(id: string) {
    setSubmiting(true)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmiting(false);
    })
     }
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmiting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmiting(false);
      })
    }
    else{
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmiting(false);
      })
    }
      
  }
  useEffect(() => {
   agent.Activities.list()
      .then((response) => {
        let activities:Activity[]=[];
        response.forEach(activity=>{
          activity.date=activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
        setLoading(false);
      });
  }, []);

  if(loading) return <LoadingComponent content="Loading app" />
  return (
    <>
    
      <NavBar openForm={openForm}  cancelActivity={cancelActivity} />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard
          activities={activities}
          cancelActivity={cancelActivity}
          selectedActivity={selectedActivity}
          selectActivity={selectActivity}
          openForm={openForm}
          closeForm={closeForm}
          editMode={editMode}
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          submiting={submiting}
        />
      </Container>
    </>
  );
}

export default App;
