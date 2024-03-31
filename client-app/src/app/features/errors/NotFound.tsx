import {Link} from 'react-router-dom';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';

export default function NotFound() {
  return (
    <Segment placeholder>
        <Header icon>
            <Icon name='search' />
            We look every where for what you looking for, but we did not find anything!
        </Header>
        <Segment.Inline>
            <Button as={Link} to='/activities'>
                Return to activities page
            </Button>
        </Segment.Inline>
    </Segment>
  )
}
