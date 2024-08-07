import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic, StatisticGroup } from "semantic-ui-react";
import { Profile } from "../../../models/Profile";
import { observer } from "mobx-react-lite";

interface Props{
    profile:Profile|null;
}
export default observer( function ProfileHeader({profile}:Props) {
  return (
    <Segment>
        <Grid>
            <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar size="small" src={profile?.image||"/assets/user.png"} />
                        <Item.Content verticalAlign="middle" >
                            <Header as="h1" content={profile?.displayName}/>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
                <StatisticGroup widths={2}>
                    <Statistic label="Followers" value="4"/>
                    <Statistic label="Following" value="34"/>
                </StatisticGroup>
                <Divider />
                <Reveal animated="move">
                    <Reveal.Content visible style={{width:"100%"}}>
                        <Button fluid color='teal' content="Following" />
                    </Reveal.Content>
                    <Reveal.Content hidden style={{width:"100%"}}>
                        <Button fluid basic 
                        color={true ? 'red':'green'}
                        content={true ? 'Unfollow':'Follow'}
                         />
                    </Reveal.Content>

                </Reveal>
            </Grid.Column>
        </Grid>
    </Segment>
  )
})
