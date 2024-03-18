import { Button, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";


export default observer( function NavBar(){
  

    return(
        <Menu inverted fixed="top">
            <Menu.Item header as={NavLink} to="/">
            <img src="/assets/logo.png" alt="logo"  style={{marginRight:'1rem'}}/>
            Activities
            </Menu.Item>
            <Menu.Item name="Activities" as={NavLink} to="/activities" />
            <Menu.Item>
                <Button positive content="Create An Activity" as={NavLink} to="/createactivity" /> 
            </Menu.Item>
        </Menu>
    );
})