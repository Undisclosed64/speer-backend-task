// NoteContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { FeedbackDisplay } from "./components/FeedbackDisplay";
const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [err, setErr] = useState(null);
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });
  const baseURL = import.meta.env.VITE_SCRIBE_BASE_URL;

  const fetchNotes = async () => {
    console.log(baseURL);

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${baseURL}/api/notes`, {
        headers,
      });

      setNotes(response.data);
    } catch (error) {
      // console.error("Error fetching notes:", error);
      const msg = error.response.data.message;
      // console.log(msg);
      setErr(msg);
      setTimeout(() => {
        setErr(null);
      }, 1500);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        fetchNotes,
        setNotes,
        accessToken,
      }}
    >
      {children}
      {err ? <FeedbackDisplay error={err} /> : ""}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  return useContext(NoteContext);
};
