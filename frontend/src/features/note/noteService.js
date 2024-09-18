import axios from "axios";

const fetchNotes = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/service/" + id + "/note", options);
    // console.log(response);
  return response.data;
};
// ADD NOTE
const addNote = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    "/api/service/" + formData.id + "/note",
    formData,
    options
  );
  //   console.log(response);
  return response.data;
};

const noteService = {
  fetchNotes,
  addNote,
};

export default noteService;
