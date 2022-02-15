import * as Yup from "yup";

export const createPlaylistSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});
