import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { UseStore } from "../../stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../layout/LoadingComponent";
import { observer } from "mobx-react-lite";



export default observer( function ProfilePage() {
  const {username}=useParams<{username:string}>();
  
  const {profileStore}=UseStore();
  const{profile,loadProfile,loadingProfile}=profileStore;
  useEffect(() => {

   if(username) loadProfile(username);
  }, [loadProfile,username])
  if(loadingProfile) return <LoadingComponent content="Loading Profile ..." />
  return (
    <Grid>
        <Grid.Column width={16}>
          
          {
            profile&&<>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
            </>
          }
          
          
            
        </Grid.Column>
    </Grid>
  )
})
