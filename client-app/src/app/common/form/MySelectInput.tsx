import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props{
    name:string;
    placeholder:string;
    options:{text:string,value:string}[];
    label?:string;
}
export default function MySelectInput(props:Props) {
  
    const[field,meta,helpers]=useField(props.name);
    return (
    <Form.Field error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <Select clearable 
        options={props.options} 
        placeholder={props.placeholder}
        value={field.value || null}
        onChange={(_,d)=>helpers.setValue(d.value)}
        onBlur={()=>helpers.setTouched(true)}
        />
           {meta.touched&&meta.error?
           <Label color='red' basic>{meta.error}</Label>:null
        }
    </Form.Field>
  )
}
