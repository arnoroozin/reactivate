import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Activity } from "../../../../models/Activity";
import { UseStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../common/form/MyTextInput";
import MyTextArea from "../../../common/form/MyTextArea";
import MySelectInput from "../../../common/form/MySelectInput";
import { categorySelectOptions } from "../../../common/options/categoryOptions";
import MyDateInput from "../../../common/form/MyDateInput";

export default observer(function ActivityForm() {
  const { activityStore } = UseStore();
  const { loading } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const initValue = {
    id: "",
    title: "",
    date: null,
    description: "",
    category: "",
    city: "",
    venue: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Activity title is required"),
    description: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required(),
    category: Yup.string().required(),
  });
  const [activity, setActivity] = useState<Activity>(initValue);
  useEffect(() => {
    if (id)
      activityStore.LoadActivity(id).then((activity) => setActivity(activity!));
    else setActivity(initValue);
  }, [id, activityStore.loadActivities]);
  function handleFormSubmit(activity: Activity) {
    if (!activity.id) {
      activityStore
        .CreateActivity(activity)
        .then(() => navigate(`/activities/${activity.id}`));
    } else {
      activityStore
        .EditActivity(activity)
        .then(() => navigate(`/activities/${activity.id}`));
    }
  }

  if (activityStore.initLoading)
    return <LoadingComponent content="Loading Activity..." />;
  return (
    <>
      <Segment clearing>
        <Header color="teal" sub content="Activity Details" />

        <Formik
          validationSchema={validationSchema}
          initialValues={activity}
          onSubmit={(values) => handleFormSubmit(values)}
          enableReinitialize
        >
          {({ handleSubmit, isValid, dirty, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="ui form"
              autoComplete="off"
            >
              <MyTextInput placeholder="Title" name="title" />

              <MyTextArea
                rows={3}
                placeholder="Description"
                name="description"
              />
              <MySelectInput
                placeholder="Category"
                name="category"
                options={categorySelectOptions}
              />
              <MyDateInput
                placeholderText="Date"
                name="date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <Header color="teal" sub content="Location Details" />

              <MyTextInput placeholder="City" name="city" />
              <MyTextInput placeholder="Venue" name="venue" />
              <Button
                loading={loading}
                disabled={!isValid || !dirty || isSubmitting}
                floated="right"
                positive
                content="Submit"
                type="submit"
              />
              <Button
                as={Link}
                to="/activities"
                floated="right"
                content="Cancel"
                type="button"
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
});
