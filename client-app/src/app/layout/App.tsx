import { useEffect } from "react";

import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";


import LoadingComponent from "./LoadingComponent";
import { UseStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = UseStore();
 

  useEffect(() => {
    activityStore.loadActivities();
    
  }, [activityStore]);

  if (activityStore.initLoading)
    return <LoadingComponent content="Loading app" />;
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashboard  />
      </Container>
    </>
  );
}

export default observer(App);
