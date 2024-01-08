import axios from "axios";
import { useEffect, useState } from "react";
import { useNoteContext } from "../NoteContext";
import { FeedbackDisplay } from "./FeedbackDisplay";

export const SearchByKeyword = ({ keyword }) => {
  const { setNotes, accessToken } = useNoteContext();
  const [err, setErr] = useState(null);
  const baseURL = import.meta.env.VITE_SCRIBE_BASE_URL;

  const handleSearch = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${baseURL}/api/notes/search`, {
        headers: headers,
        params: {
          q: keyword,
        },
      });
      setNotes(response.data);
    } catch (error) {
      // console.error("Error fetching notes:", error);
      setErr("Error fetching notes");
      setTimeout(() => {
        setErr(null);
      }, 1500);
    }
  };

  useEffect(() => {
    if (keyword) {
      handleSearch();
    }
  }, [keyword, setNotes]);

  return <>{err ? <FeedbackDisplay error={err} /> : ""}</>;
};
