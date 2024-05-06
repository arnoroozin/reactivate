import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  
  ItemDescription,
  
  Label,
  
  Segment,
} from "semantic-ui-react";
// import { UseStore } from "../../../stores/store";
// import { SyntheticEvent, useState } from "react";
import { Activity } from "../../../../models/Activity";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
  activity: Activity;
}
export default observer( function ActivityListItem({ activity }: Props) {
  // const { activityStore } = UseStore();

  // const [target, setTarget] = useState("");
  // function handleDeleteLoading(
  //   e: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) {
  //   setTarget(e.currentTarget.name);
  //   activityStore.DeleteActivity(id);
  // }
  return (
    <Segment.Group>
   <Segment>
    {activity.isCancelled&&
    <Label attached="top" color="red" content="Cancelled" style={{textAlign:'center'}} />
    }
    <Item.Group>
        <Item>
            <Item.Image size="tiny" circular src='/assets/user.png' />
            <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`} >
                    {activity.title}
                </Item.Header>
                <Item.Description>Hosted by {activity.host?.displayName} </Item.Description>
                {activity.isHost && (
                  <ItemDescription >
                    <Label basic color="orange" >
                      You are hosting this activity
                    </Label>
                  </ItemDescription>
                )}
                {activity.isGoing && !activity.isHost &&(
                  <ItemDescription >
                    <Label basic color="green" >
                      You are going to this activity
                    </Label>
                  </ItemDescription>
                )}
            </Item.Content>
        </Item>
    </Item.Group>
   </Segment>
   <Segment>
    <span style={{marginRight:'1rem'}}>
        <Icon name="clock" /> {format(activity.date!,'dd MMM yyyy h:mm aa')}
       </span >
<span>
<Icon name="marker" />{activity.venue}
    </span>
   </Segment>
   <Segment secondary >
    <ActivityListItemAttendee attendees={activity.attendees!} />
   </Segment>
   <Segment clearing>
    <span>{activity.description}</span>
    <Button 
    as={Link}
    to={`/activities/${activity.id}`}
    color="teal"
    floated="right"
    content="View"
    />
   </Segment>
   </Segment.Group>
  );
})
