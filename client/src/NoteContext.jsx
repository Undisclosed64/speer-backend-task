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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ1MTE5OTgsImV4cCI6MTcwNDU0Nzk5OH0.FX3BbD84JxvvLj6_PsUQggIiwD3OrSIhs0xcgMfdJkE",
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
    <NoteContext.Provider value={{ notes, addNote, fetchNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  return useContext(NoteContext);
};
