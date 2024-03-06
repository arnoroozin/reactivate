import { Button, Menu } from "semantic-ui-react";

interface Props{

    openForm:(id?:string)=>void;
    cancelActivity:()=>void;
    
    
}
export default function NavBar({openForm,cancelActivity}:Props){
    return(
        <Menu inverted fixed="top">
            <Menu.Item header>
            <img src="/assets/logo.png" alt="logo"  style={{marginRight:'1rem'}}/>
            Activities
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
                <Button positive content="Create An Activity" onClick={()=>{openForm(); cancelActivity();}}/> 
            </Menu.Item>
        </Menu>
    );
}