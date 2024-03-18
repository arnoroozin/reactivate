import { Button, Form,  Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Activity } from "../../../../models/Activity";
import { UseStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import {v4 as uuid} from 'uuid';


export default observer( function ActivityForm() {
  const{activityStore}=UseStore();
  const{id}=useParams();
  const navigate=useNavigate();
  const initValue={
    id:          '',
    title:       '',
    date:        '',
    description: '',
    category:    '',
    city:        '',
    venue:       '',
  };
  const [activity,setActivity]=useState<Activity>(initValue);
  useEffect(()=>{
    if(id) activityStore.LoadActivity(id).then(activity=>setActivity(activity!))
    else setActivity(initValue);
  },[id,activityStore.loadActivities])
  function handleSubmit(){
    if(!activity.id){
      activity.id=uuid();
      activityStore.CreateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
    }else{
      activityStore.EditActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
    }
  }
  function handleChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
    const {name,value}=event.target;
    setActivity({...activity,[name]:value});    
  }
  if(activityStore.initLoading) return <LoadingComponent content="Loading Activity..."/>
  return (
    <Segment clearing>
        <Form  onSubmit={handleSubmit} >
            <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleChange} />
            <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleChange} />
            <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleChange} />
            <Form.Input placeholder='Date' type="date" name='date' value={activity.date} onChange={handleChange} />
            <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleChange} />
            <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleChange} />
            <Button floated="right" positive content="Submit" type="submit"  loading={activityStore.loading} />
            <Button as={Link} to='/activities' floated="right"  content="Cancel" type="button"  />
            
        </Form>
    </Segment>
  )
})
