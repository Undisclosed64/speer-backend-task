import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormatDate } from "./FormatDate";
import { MdOutlineStickyNote2 } from "react-icons/md";

const SharedNoteView = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/shared/${id}`
        );
        setNote(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]); // Include id as a dependency to re-fetch the note when the id changes

  if (!note) {
    // If note data is still loading or an error occurred during fetching
    return <div>Loading...</div>;
  }

  return (
    <div className="note-viewer-container h-screen w-screen">
      <div className="brand-name flex items-center mb-20 p-10 text-brightblack">
        <div className="text-5xl mr-2">
          <MdOutlineStickyNote2 />
        </div>
        <h1 className="text-4xl font-bold ">Scribe</h1>
      </div>
      <div className="shared-note max-w-2xl mx-auto bg-white p-8 el">
        <h1
          className="text-3xl font-bold mb-6 text-brightblack capitalize
"
        >
          {note.title}
        </h1>
        <div className="text-brightblack mb-6">{note.content}</div>

        {/* Additional Information */}
        <div className="flex items-center justify-between text-md text-gray-500">
          <div>
            <span>Created by: {note.user.username}</span>
          </div>
          <div>
            <span>{FormatDate(note.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedNoteView;
