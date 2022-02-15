import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { createPlaylistSchema } from "../../schemas/createPlaylistSchema";
import { createPlaylist } from "../../api/playlistApi";
import MainLayout from "../../components/MainLayout";
import FormInput from "../../components/common/FormInput";
import "./createPlaylistPage.scss";

function CreatePlaylistPage() {
  const userId = useSelector((state) => state.auth.user.id);

  const addPlaylist = ({ name, description, songs }) => {
    createPlaylist({ name, description, songs, userId });
  };

  return (
    <MainLayout>
      <div className="create-playlist-wrapper">
        <div className="create-playlist-content">
          <div className="playlist-photo">
            <div className="playlist-photo-holder">
              <img className="playlist-photo-img" alt="playlist" />
            </div>
            <button className="playlist-upload-photo-button">Upload</button>
          </div>
          <div className="playlist-form">
            <Formik
              initialValues={{
                name: "",
                description: "",
                songs: [],
              }}
              validationSchema={createPlaylistSchema}
              onSubmit={addPlaylist}
            >
              <Form>
                <Field
                  component={FormInput}
                  name="name"
                  placeholder="name..."
                />
                <Field
                  component={FormInput}
                  name="description"
                  placeholder="description..."
                  isTextarea
                />
                <div className="playlist-button">
                  <button className="create-playlist-button">
                    Create playlist
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="playlists-list-holder">
          <ul className="playlists-list">
            <li className="playlists-list-item" />
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreatePlaylistPage;
