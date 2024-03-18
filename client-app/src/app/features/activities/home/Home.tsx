import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function Home() {
  return (
    <Container>
        <h1>Home Page</h1>
        <h2>Go to <Link to='/activities'>Activities</Link></h2>
    </Container>
  )
}
