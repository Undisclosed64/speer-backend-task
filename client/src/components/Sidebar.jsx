import { IoIosAddCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import axios from "axios";
import { useNoteContext } from "../NoteContext";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { FeedbackDisplay } from "./FeedbackDisplay";

import { useState } from "react";

const Sidebar = () => {
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { addNote, accessToken } = useNoteContext();
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const baseURL = import.meta.env.VITE_SCRIBE_BASE_URL;

  const colors = [
    "bg-[#ffa67e]",
    "bg-[#fccf81]",
    "bg-[#be9efd]",
    "bg-[#e7f19a]",
    "bg-[#05d9fe]",
  ];
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const openAddNoteModal = () => {
    setAddNoteModalOpen(true);
  };

  const closeAddNoteModal = () => {
    setAddNoteModalOpen(false);
  };

  const saveNoteHandler = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setErr("Please fill in the fields");
      setTimeout(() => {
        setErr(null);
      }, 1500);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/notes`, formData, {
        headers,
      });
      //   console.log(response.data);
      addNote(response.data);
      // console.log(response);
      setSuccess("Note created successfully!");
      setFormData({ title: "", content: "" });
      setTimeout(() => {
        setSuccess(null);
      }, 1500);
      closeAddNoteModal();
    } catch (err) {
      setErr(err.response.data.message);
      setTimeout(() => {
        setErr(null);
      }, 1500);
      // console.log(err);
    }
  };

  const sidebarStyle = {
    width: isAddNoteModalOpen ? "30%" : "16.666667%",
    minHeight: "100vh",
    transition: "width 0.3s ease-in-out",
  };
  return (
    <div
      className="sidebar w-1/6  border-r border-[#e5e5e5] flex flex-col items-center gap-20 p-5"
      style={sidebarStyle}
    >
      <div className="brand-name flex items-center text-brightblack">
        <div className="text-5xl mr-2">
          <MdOutlineStickyNote2 className="text-blue" />
        </div>
        <h2 className="text-4xl font-bold">Scribe</h2>
      </div>
      <div className="add-btn cursor-pointer" onClick={openAddNoteModal}>
        <IoIosAddCircle className="text-5xl text-brightblack" />
      </div>
      {/* Add Note Modal */}

      {isAddNoteModalOpen && (
        <div className="modal px-2 py-4 shadow-md border el">
          <div className="modal-header flex justify-between items-center">
            <IoMdClose
              className="cursor-pointer text-2xl"
              onClick={closeAddNoteModal}
            />
            {/* Save Button */}
            <button
              className="bg-brightblack text-white px-4 py-2 rounded-full flex items-center justify-between text-sm transition-all duration-300 focus:outline-none hover:bg-[#333] active:bg-[#222]"
              onClick={(e) => saveNoteHandler(e)}
            >
              <span className="mr-2">Save</span>
              <IoCheckmarkSharp />
            </button>
          </div>
          <div className="modal-content p-4">
            {/* Title Input */}
            <input
              type="text"
              placeholder="New note title"
              className="mb-2 p-3 bg-gray-100 border-none focus:outline-none rounded-md text-xl placeholder-gray-500 lg:w-full"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {/* Content Input */}
            <textarea
              placeholder="New note content"
              className="mb-2 p-3 bg-gray-100 w-full resize-none border-none focus:outline-none rounded-md text-xl placeholder-gray-500"
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          <div className="modal-footer flex flex-col p-4 ">
            <div className="line w-full border-t border-gray-100 mb-2"></div>
            <div className="dots flex justify-around mt-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`dot w-3 h-3 rounded-full ml-1 ${
                    colors[index % colors.length]
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
      {err ? <FeedbackDisplay error={err} /> : ""}
      {success ? <FeedbackDisplay success={success} /> : ""}
    </div>
  );
};

export default Sidebar;
