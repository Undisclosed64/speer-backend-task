import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormatDate } from "./FormatDate";
import { IoPencilOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { IoCheckmarkSharp, IoShareSocial } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../NoteContext";
import { ShareNoteModal } from "./ShareNoteModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { TailSpin } from "react-loader-spinner";

const Note = () => {
  const [note, setNote] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const navigate = useNavigate();
  const { fetchNotes, accessToken } = useNoteContext();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const baseURL = import.meta.env.VITE_SCRIBE_BASE_URL;

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/notes/${id}`, {
          headers,
        });
        // console.log(response.data);
        setNote(response.data);
        setEditedTitle(response.data.title || "");
        setEditedContent(response.data.content || "");
      } catch (err) {
        const errMsg = err.response.data.message;
        setErr(errMsg);
        console.log(err);
        setTimeout(() => {
          setErr(null);
        }, 1500);
      } finally {
        setLoading(false);
      }
    };
    getNote();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedNote = {
        title: editedTitle,
        content: editedContent,
      };
      const response = await axios.put(
        `${baseURL}/api/notes/${id}`,
        updatedNote,
        {
          headers,
        }
      );
      setSuccess("Note updated successfully");
      setTimeout(() => {
        setSuccess(null);
      }, 1500);
      setNote(response.data);
      setIsEditing(false);
      fetchNotes();
    } catch (error) {
      console.log("Error updating note:", error);
      const err = error.response.data.message;
      setErr(err);
      setTimeout(() => {
        setErr(null);
      }, 1500);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  const handleDelete = async () => {
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${baseURL}/api/notes/${id}`, {
        headers,
      });
      setShowDeleteModal(false);
      setSuccess("Note deleted successfully");
      setTimeout(() => {
        setSuccess(null);
      }, 1500);
      navigate("/");
      fetchNotes();
    } catch (error) {
      // console.error("Error deleting note:", error);
      setErr("Error deleting note. Please try again. ");
      setTimeout(() => {
        setErr(null);
      }, 1500);
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
    try {
      const response = await axios.post(
        `${baseURL}/api/notes/${id}/share`,
        null,
        {
          headers: headers,
        }
      );
      setShareLink(response.data.fullShareableLink);
    } catch (error) {
      console.log(error);
      // console.error("Error fetching share link:", error);
      setErr(error.response.data.message);
      setTimeout(() => {
        setErr(null);
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-20 py-5">
      {!note ? (
        <div className="min-w-[600px]">
          <div className="loader-container">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#5044e4"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              loading={loading}
            />
          </div>
        </div>
      ) : (
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
                  className="bg-brightblack text-white px-4 py-2 flex items-center justify-between text-sm transition-all duration-300"
                  onClick={handleSaveEdit}
                >
                  <span className="mr-2">Save</span>
                  <IoCheckmarkSharp />
                </button>
                <button
                  className="text-sm text-gray-500 "
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
          {err ? <FeedbackDisplay error={err} /> : ""}
          {success ? <FeedbackDisplay success={success} /> : ""}
        </div>
      )}
    </div>
  );
};

export default Note;
