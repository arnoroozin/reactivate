import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../models/Activity";
export default function ActivityDetails({activity,cancelActivity,openForm}:Props) {
  return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`}   />
    <CardContent>
      <CardHeader>{activity.title}</CardHeader>
      <CardMeta>
        <span >{activity.date}</span>
      </CardMeta>
      <CardDescription>
        {activity.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <ButtonGroup widths={'2'}>
        <Button basic animated color="blue" content="Edit" onClick={()=>openForm(activity.id)} />
        <Button basic animated color="grey" content="Cancel" onClick={cancelActivity} />
      </ButtonGroup>
    </CardContent>
  </Card>
  )
}
interface Props{
    activity:Activity;
    cancelActivity:()=>void;
    openForm:(id:string)=>void;
     
     
    }