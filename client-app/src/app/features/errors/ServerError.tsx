import { observer } from "mobx-react-lite"
import { UseStore } from "../../stores/store"
import { Container, Header, Segment } from "semantic-ui-react";

export default observer( function ServerError() {
    const{commonStore} =UseStore();
    const{errors}=commonStore;
  return (
    <Container>
        <Header as="h1" content="Server Error" />
        <Header sub color="red" as="h4" content={errors?.message} />
        {errors?.details&& (
            <Segment>
                <Header as="h5" color="teal"  content="stack trace" />
                <code style={{marginTop:'10px'}}>{errors.details}</code>
            </Segment>
        ) }
    </Container>
  )
})
