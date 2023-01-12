import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import { playlistSchema } from "../../schemas/playlistSchema";
import FormInput from "../common/FormInput";
import "./editPlaylistForm.scss";

function EditPlaylistForm({
  currentPlaylist: { name, description },
  onEditPlaylist,
}) {
  return (
    <Formik
      initialValues={{
        name,
        description,
      }}
      validationSchema={playlistSchema}
      onSubmit={onEditPlaylist}
    >
      <Form className="edit-playlist-form">
        <Field component={FormInput} name="name" placeholder="name..." />
        <Field
          component={FormInput}
          name="description"
          placeholder="description..."
          isTextarea
        />
        <div className="playlist-button">
          <button className="edit-playlist-button">Save changes</button>
        </div>
      </Form>
    </Formik>
  );
}

EditPlaylistForm.propTypes = {
  currentPlaylist: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onEditPlaylist: PropTypes.func.isRequired,
};

export default EditPlaylistForm;
