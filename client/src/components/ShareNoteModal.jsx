import { useState } from "react";
import { IoCopy, IoClose, IoCheckmarkCircleOutline } from "react-icons/io5";
import styles from "./ShareNoteModal.module.css";

export const ShareNoteModal = ({ onClose, shareLink }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link to clipboard", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded-lg w-96 lg:w-1/3">
        <p className="text-3xl font-bold mb-6 text-center">Share Note</p>
        {!shareLink ? (
          <p className="text-center text-gray-600">Getting link...</p>
        ) : (
          <>
            <div className="mb-6">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="border rounded w-full p-3 focus:outline-none text-gray-800"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                className={`bg-brightblack text-white px-4 py-2 rounded-full text-lg focus:outline-none flex items-center ${
                  isCopied ? styles.copiedButton : ""
                }`}
                onClick={handleCopyToClipboard}
              >
                {isCopied ? (
                  <>
                    <IoCheckmarkCircleOutline className="mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <IoCopy className="mr-2" />
                    Copy
                  </>
                )}
              </button>
              <button
                className="text-gray-800  focus:outline-none flex items-center"
                onClick={onClose}
              >
                <IoClose className="mr-2" />
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
