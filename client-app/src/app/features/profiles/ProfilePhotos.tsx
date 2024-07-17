import {
  Button,
  Card,
  Grid,
  GridColumn,
  Header,
  Image,
  TabPane,
} from "semantic-ui-react";
import { Photo, Profile } from "../../../models/Profile";
import { observer } from "mobx-react-lite";
import { UseStore } from "../../stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../common/imageUpload/PhotoUploadWidget";

interface Props {
  profile: Profile;
}
export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMain,deletePhoto },
  } = UseStore();
  const [isAddImagemode, setIsAddImagemode] = useState(false);
  const [target, setTarget] = useState("");
  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setIsAddImagemode(false));
  }
  function setMainPhoto(Photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    setMain(Photo);
  }
  function handleDeletePhoto(id: string, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deletePhoto(id);
  }
  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              basic
              floated="right"
              content={isAddImagemode ? "Cancel" : "Add Photo"}
              onClick={() => setIsAddImagemode(!isAddImagemode)}
            />
          )}
        </GridColumn>
        <GridColumn width={16}>
          {isAddImagemode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((image) => (
                <Card key={image.id}>
                  <Image src={image.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        color="green"
                        basic
                        content="Main"
                        name={image.id}
                        disabled={image.isMain}
                        loading={target === image.id && loading}
                        onClick={(e) => setMainPhoto(image, e)}
                      />
                      <Button
                        basic
                        icon="trash"
                        color="red"
                        name={'del'+image.id}
                        disabled={image.isMain}
                        loading={target === 'del'+image.id && loading}
                        onClick={e=>handleDeletePhoto(image.id,e)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
});
