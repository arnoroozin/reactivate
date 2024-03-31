

import { Container } from "semantic-ui-react";

import NavBar from "./NavBar";

import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../features/activities/home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  const location=useLocation();
  return (
    <>
    <ToastContainer position="bottom-right" theme="colored" />
    {location.pathname==="/"?<Home /> :(<>
      <NavBar  />
      <Container style={{ marginTop: "10rem" }}>
        <Outlet />
      </Container>
    </>) }
      
    </>
  );
}

export default observer(App);
