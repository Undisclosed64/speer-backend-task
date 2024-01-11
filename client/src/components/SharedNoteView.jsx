import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormatDate } from "./FormatDate";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import { FeedbackDisplay } from "./FeedbackDisplay";

const SharedNoteView = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_SCRIBE_BASE_URL;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/notes/shared/${id}`);
        setNote(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.error("Error fetching note:", error);
        setErr(error.response.data.message);
        setTimeout(() => {
          setErr(null);
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <div className="note-viewer-container h-screen w-screen">
      {loading ? (
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
      ) : (
        <>
          <div className="brand-name flex items-center mb-20 p-10 text-brightblack">
            <div className="mr-2 text-3xl ">
              <MdOutlineStickyNote2 className="text-blue" />
            </div>
            <h1 className="text-2xl font-bold ">Scribe</h1>
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
        </>
      )}
      {err ? <FeedbackDisplay error={err} /> : ""}
    </div>
  );
};

export default SharedNoteView;
