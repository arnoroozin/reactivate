import { Button, Menu } from "semantic-ui-react";
import { UseStore } from "../stores/store";
import { observer } from "mobx-react-lite";


export default observer( function NavBar(){
  const { activityStore } = UseStore();

    return(
        <Menu inverted fixed="top">
            <Menu.Item header>
            <img src="/assets/logo.png" alt="logo"  style={{marginRight:'1rem'}}/>
            Activities
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
                <Button positive content="Create An Activity" onClick={()=>{activityStore.openForm(); activityStore.cancelActivity();}}/> 
            </Menu.Item>
        </Menu>
    );
})