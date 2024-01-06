import { IoIosAddCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";

import { useState } from "react";

const Sidebar = () => {
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const colors = [
    "bg-[#ffa67e]",
    "bg-[#fccf81]",
    "bg-[#be9efd]",
    "bg-[#e7f19a]",
    "bg-[#05d9fe]",
  ];

  const openAddNoteModal = () => {
    setAddNoteModalOpen(true);
  };

  const closeAddNoteModal = () => {
    setAddNoteModalOpen(false);
  };
  const sidebarStyle = {
    width: isAddNoteModalOpen ? "30%" : "16.666667%",
    transition: "width 0.3s ease-in-out",
  };
  return (
    <div
      className="sidebar w-1/6 border-r border-[#e5e5e5] flex flex-col items-center gap-24 p-5 h-screen"
      style={sidebarStyle}
    >
      <div className="brand-name">
        <h2 className="text-3xl font-bold">Scribe</h2>
      </div>
      <div className="add-btn cursor-pointer" onClick={openAddNoteModal}>
        <IoIosAddCircle className="text-5xl" />
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
            <button className="bg-brightblack text-white px-4 py-2 rounded-full flex items-center justify-between text-sm transition-all duration-300 hover:bg-[#e5499d]">
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
            />
            {/* Content Input */}
            <textarea
              placeholder="New note content"
              className="mb-2 p-3 bg-gray-100 w-full resize-none border-none focus:outline-none rounded-md text-xl placeholder-gray-500"
            />
          </div>

          <div className="modal-footer flex flex-col p-4">
            <div className="line w-full border-t border-gray-300 mb-2"></div>
            <div className="dots flex justify-between">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`dot w-7 h-7 rounded-full  ml-2 ${
                    colors[index % colors.length]
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
