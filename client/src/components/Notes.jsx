import { useState, useEffect } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../NoteContext";

const Notes = () => {
  // const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { notes } = useNoteContext();

  const colors = [
    "bg-[#ffa67e]",
    "bg-[#fccf81]",
    "bg-[#be9efd]",
    "bg-[#e7f19a]",
    "bg-[#05d9fe]",
  ];

  useEffect(() => {
    // const headers = {
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ1MTE5OTgsImV4cCI6MTcwNDU0Nzk5OH0.FX3BbD84JxvvLj6_PsUQggIiwD3OrSIhs0xcgMfdJkE",
    // };
    // const getNotes = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/api/notes`, {
    //       headers,
    //     });
    //     console.log(response.data);
    //     // setNotes(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getNotes();
  }, [notes]);

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  const getNoteDetails = async (id) => {
    navigate(`notes/${id}`);
  };

  return (
    <div className="main px-20 py-5 mb-10">
      <div className="search-input flex items-center gap-2 text-lg cursor-pointer">
        <IoSearch className="text-slate-400 text-2xl" />
        <input
          type="text"
          placeholder="Search"
          className="w-full border-b p-2 px-0 outline-none"
        />
      </div>

      <div className="notes-section mt-20">
        <h1 className="font-semibold mb-14 text-brightblack ">Notes</h1>
        <div className="notes-wrapper">
          {notes.map((note, index) => {
            return (
              <div
                key={note._id}
                className={`el p-6 h-64 text-brightblack flex flex-col cursor-pointer justify-between ${
                  colors[index % colors.length]
                }`}
                onClick={() => getNoteDetails(note._id)}
              >
                <div className="title capitalize">{note.title}</div>
                <div
                  className="date text-lightblack font-light
"
                >
                  {" "}
                  {formatDate(note.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Notes;
