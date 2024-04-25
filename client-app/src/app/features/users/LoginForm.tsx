import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { UseStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer( function LoginForm() {
    const {userStore}=UseStore();
  return (
    <Formik
     initialValues={{email:'',password:'',error:null}}
     onSubmit={(values,{setErrors})=>userStore.login(values).catch(()=>setErrors({error:'Invalid username or password' }))}
    >
        {({handleSubmit,isSubmitting,errors})=>(
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
               <Header color="teal" inverted content="Login to Reactivities" textAlign="center" size="huge" />
                <MyTextInput name="email" placeholder="Email" />
                <MyTextInput name="password" placeholder="Password" type="password" />
                <ErrorMessage 
                name="error"
                render={()=><Label style={{marginBottom:10}} basic color="red" content={errors.error} />}
                />
                <Button loading={isSubmitting} positive content="Login" fluid type="submit" />
            </Form>
        )}
    </Formik>
  )
})
