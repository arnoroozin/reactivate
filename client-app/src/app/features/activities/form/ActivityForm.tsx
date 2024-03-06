import { Button, Form,  Segment } from "semantic-ui-react";
import { Activity } from "../../../models/Activity";
import { ChangeEvent, useState } from "react";

interface Props{

    closeForm:()=>void;
    activity:Activity|undefined;
    handleCreateOrEditActivity:(activity:Activity)=>void;
    submiting:boolean;


}
export default function ActivityForm({activity:selectedActivity,closeForm,handleCreateOrEditActivity,submiting}:Props) {

  const initiaState= selectedActivity??{
    id:          '',
    title:       '',
    date:        '',
    description: '',
    category:    '',
    city:        '',
    venue:       '',
  };
  const [activity,setActivity]=useState<Activity>(initiaState);
  function handleSubmit(){
    handleCreateOrEditActivity(activity);
  }
  function handleChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
    const {name,value}=event.target;
    setActivity({...activity,[name]:value});
    
  }
  
  return (
    <Segment clearing>
        <Form  onSubmit={handleSubmit} autoCpmpelete='off'>
            <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleChange} />
            <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleChange} />
            <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleChange} />
            <Form.Input placeholder='Date' type="date" name='date' value={activity.date} onChange={handleChange} />
            <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleChange} />
            <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleChange} />
            <Button floated="right" positive content="Submit" type="submit"  loading={submiting} />
            <Button floated="right"  content="Cancel" type="button" onClick={closeForm} />
            
        </Form>
    </Segment>
  )
}
