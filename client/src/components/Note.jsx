import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Note = () => {
  const [note, setNote] = useState();
  const { id } = useParams();
  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IklicmFoaW0iLCJlbWFpbCI6ImliQGdtYWlsLmNvbSIsImlkIjoiNjU5Njc1MjYwYTMwNDc0ZTJjMDI2ZmRiIiwiaWF0IjoxNzA0NDQ0MjUzLCJleHAiOjE3MDQ0ODAyNTN9.pXfX2uaRGUPIRewrwNYR3syf9KaIuqSNXFrsBq_hV9o",
    };
    const getNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          {
            headers,
          }
        );
        console.log(response.data);
        setNote(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNote();
  });
  return <div>hi</div>;
};
export default Note;
