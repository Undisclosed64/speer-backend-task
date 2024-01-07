import axios from "axios";
import { useState, useEffect } from "react";
import { useNoteContext } from "../NoteContext";

export const SearchByKeyword = ({ keyword }) => {
  const { setNotes } = useNoteContext();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ2MDcxMTEsImV4cCI6MTcwNDY0MzExMX0.hzKvGu8BZzZd5dw48xVrtvxDiO0-5pMlOYTp5OgYxp4",
      };

      const response = await axios.get(
        "http://localhost:5000/api/notes/search",
        {
          headers: headers,
          params: {
            q: keyword,
          },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      handleSearch();
    }
  }, [keyword, setNotes]);

  return <></>;
};
