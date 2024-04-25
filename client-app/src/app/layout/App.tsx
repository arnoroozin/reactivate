import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";

import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../features/activities/home/Home";
import { ToastContainer } from "react-toastify";
import { UseStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const { userStore, commonStore } = UseStore();
  const location = useLocation();
  useEffect(() => {
    if (commonStore.token)
      userStore.getuser().finally(() => commonStore.setAppLoaded());
    else commonStore.setAppLoaded();
  }, [userStore, commonStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content="Loading app..." />

  return (
    <>
    <ModalContainer /> 
      <ToastContainer position="bottom-right" theme="colored" />
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "10rem" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
