import { Button, Dropdown, Image, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { UseStore } from "../stores/store";


export default observer( function NavBar(){
  const {userStore:{user,logOut}}=UseStore();

    return(
        <Menu inverted fixed="top">
            <Menu.Item header as={NavLink} to="/">
            <img src="/assets/logo.png" alt="logo"  style={{marginRight:'1rem'}}/>
            Activities
            </Menu.Item>
            <Menu.Item name="Activities" as={NavLink} to="/activities" />
            <Menu.Item name="Errors" as={NavLink} to="/errors" />
            <Menu.Item>
                <Button positive content="Create An Activity" as={NavLink} to="/createactivity" /> 
            </Menu.Item>
            <Menu.Item position="right">
                <Image src={user?.image||'/assets/user.png'} avatar spaced='right' />
                <Dropdown pointing='top right' text={user?.displayName}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${user?.username}`} icon="user" text="My profile"/>
                        <Dropdown.Item onClick={logOut} text="Logout" icon='power'/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    );
})