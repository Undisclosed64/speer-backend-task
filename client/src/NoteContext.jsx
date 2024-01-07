// NoteContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ2MDcxMTEsImV4cCI6MTcwNDY0MzExMX0.hzKvGu8BZzZd5dw48xVrtvxDiO0-5pMlOYTp5OgYxp4",
      };

      const response = await axios.get("http://localhost:5000/api/notes", {
        headers,
      });

      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, fetchNotes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  return useContext(NoteContext);
};
