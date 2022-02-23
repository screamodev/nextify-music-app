import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylistSchema } from "../../schemas/createPlaylistSchema";
import { addPlaylist } from "../../store/playlistsSlice";
import playlistDefaultImage from "../../assets/images/default-playlist-img.jpeg";
import MainLayout from "../../components/MainLayout";
import FormInput from "../../components/common/FormInput";
import "./createPlaylistPage.scss";

function CreatePlaylistPage() {
  const userId = useSelector((state) => state.auth.user.id);
  const playlists = useSelector((state) => state.playlists.playlists);
  const dispatch = useDispatch();

  const createPlaylistHandler = (
    { name, description, songsIds },
    { resetForm }
  ) => {
    const date = new Date().getTime();
    dispatch(addPlaylist({ name, description, songsIds, date, userId }));
    resetForm();
  };

  return (
    <MainLayout>
      <div className="create-playlist-wrapper">
        <div className="create-playlist-content">
          <div className="playlist-photo">
            <div className="playlist-photo-holder">
              <img
                className="playlist-photo-img"
                src={playlistDefaultImage}
                alt="playlist"
              />
            </div>
            <button className="playlist-upload-photo-button">Upload</button>
          </div>
          <div className="playlist-form">
            <Formik
              initialValues={{
                name: "",
                description: "",
                songsIds: [],
                date: "",
              }}
              validationSchema={createPlaylistSchema}
              onSubmit={createPlaylistHandler}
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
          <p className="playlists-list-title">Your Playlists</p>
          <div className="playlist-cards">
            {playlists.map(({ id, name }) => (
              <div key={id} className="playlist-card">
                <img
                  className="playlist-card-img"
                  src={playlistDefaultImage}
                  alt="playlist"
                />
                <p className="playlist-card-text">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreatePlaylistPage;
