import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ErrorMsg } from "./ErrorMsg";
import { FormatDate } from "./FormatDate";
import { IoPencilOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { IoCheckmarkSharp, IoShareSocial } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../NoteContext";
import { ShareNoteModal } from "./ShareNoteModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
// import { handleShare } from "./ShareNoteModal";

const Note = () => {
  const [note, setNote] = useState();
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const navigate = useNavigate();
  const { fetchNotes } = useNoteContext();

  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ1NTA0MDgsImV4cCI6MTcwNDU4NjQwOH0.QkA7x8qobHZV-fJAwaL1D3idiftQeN1gunJuxzvdauM",
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
        setEditedTitle(response.data.title || "");
        setEditedContent(response.data.content || "");
      } catch (err) {
        const errMsg = err.response.data.message;
        setErr(errMsg);
        console.log(err);
        setTimeout(() => {
          setErr("");
        }, 3000);
      }
    };
    getNote();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ1NTA0MDgsImV4cCI6MTcwNDU4NjQwOH0.QkA7x8qobHZV-fJAwaL1D3idiftQeN1gunJuxzvdauM",
    };
    try {
      const updatedNote = {
        title: editedTitle,
        content: editedContent,
      };
      const response = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        updatedNote,
        {
          headers,
        }
      );
      setSuccessMsg("Note updated successfully");
      console.log("Note updated successfully:", response.data);
      setNote(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  const handleDelete = async () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmed = async () => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ1NjE4OTQsImV4cCI6MTcwNDU5Nzg5NH0.96_QYYVmOxqGK6pX94UUIoN_LFN2Uz1PlxbzZCqp3-A",
    };
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers,
      });
      setShowDeleteModal(false);
      setSuccessMsg("Note deleted successfully");
      navigate("/");
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const handleDeleteCancelled = () => {
    setShowDeleteModal(false);
  };
  const handleShareClick = () => {
    setShowShareModal(true);
    handleShare(id);
  };
  const handleShare = async (id) => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWQiOiI2NTk4YzlmMTI2ZDVkNjhmZTE4ZTYyZGYiLCJpYXQiOjE3MDQ1NjE4OTQsImV4cCI6MTcwNDU5Nzg5NH0.96_QYYVmOxqGK6pX94UUIoN_LFN2Uz1PlxbzZCqp3-A",
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/notes/${id}/share`,
        null,
        {
          headers: headers,
        }
      );
      setShareLink(response.data.fullShareableLink);
    } catch (error) {
      console.error("Error fetching share link:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-20 py-5">
      <div className="note-details max-w-2xl w-full p-6 rounded-lg min-w-[600px]">
        {isEditing ? (
          <div>
            <label htmlFor="editedTitle" className="text-lg font-semibold">
              Edit title:
            </label>
            <input
              type="text"
              id="editedTitle"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mb-4 p-3 bg-gray-100 border-none focus:outline-none rounded-md text-xl placeholder-gray-500 w-full"
            />

            <label htmlFor="editedContent" className="text-lg font-semibold">
              Edit content:
            </label>
            <textarea
              id="editedContent"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mb-4 p-3 bg-gray-100 w-full resize-none border-none focus:outline-none rounded-md text-xl placeholder-gray-500 h-32"
            />
            <div className="flex items-center space-x-4">
              <button
                className="bg-brightblack text-white px-4 py-2 rounded-full flex items-center justify-between text-sm transition-all duration-300"
                onClick={handleSaveEdit}
              >
                <span className="mr-2">Save</span>
                <IoCheckmarkSharp />
              </button>
              <button
                className="text-sm text-gray-500"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">{note?.title}</h1>
            <div className="text-gray-700 mb-4">{note?.content}</div>
            <div className="text-sm text-gray-500 mb-4">
              {FormatDate(note?.createdAt)}
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="flex items-center text-sm text-blue-500 "
                onClick={handleEdit}
              >
                <IoPencilOutline className="mr-1" />
                Edit
              </button>
              <button
                className="flex items-center text-sm text-red-500"
                onClick={handleDelete}
              >
                <IoTrashOutline className="mr-1" />
                Delete
              </button>
              <button
                className="flex items-center text-sm text-green-500 "
                onClick={handleShareClick}
              >
                <IoShareSocial className="mr-1" />
                Share
              </button>
            </div>

            {showDeleteModal && (
              <DeleteConfirmationModal
                onCancel={handleDeleteCancelled}
                onConfirm={handleDeleteConfirmed}
              />
            )}

            {showShareModal && (
              <ShareNoteModal
                onClose={() => setShowShareModal(false)}
                shareLink={shareLink}
              />
            )}
          </div>
        )}
        {err ? <ErrorMsg error={err} /> : ""}
        {successMsg ? <ErrorMsg success={successMsg} /> : ""}
      </div>
    </div>
  );
};

export default Note;
