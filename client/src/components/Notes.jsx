import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../NoteContext";
import { FormatDate } from "./FormatDate";
import { SearchByKeyword } from "./SearchByKeyword";
import { useRef } from "react";

const Notes = () => {
  const navigate = useNavigate();
  const { notes } = useNoteContext();
  const [searchActive, setSearchActive] = useState(false);
  const [keyword, setKeyword] = useState("");

  const colors = [
    "bg-[#ffa67e]",
    "bg-[#fccf81]",
    "bg-[#be9efd]",
    "bg-[#e7f19a]",
    "bg-[#05d9fe]",
  ];

  useEffect(() => {}, [notes]);
  useEffect(() => {}, [keyword]);

  const getNoteDetails = async (id) => {
    navigate(`notes/${id}`);
  };

  const debounceSearch = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = useRef(
    debounceSearch((value) => {
      setKeyword(value);
      setSearchActive(true);
    }, 300)
  ).current;

  return (
    <div className="main px-20 py-5 mb-10 ">
      <div className="search-input flex items-center gap-2 text-lg cursor-pointer">
        <IoSearch
          className="text-slate-400 text-2xl"
          onClick={() => setSearchActive(true)}
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full border-b p-2 px-0 outline-none"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      {searchActive ? (
        <SearchByKeyword keyword={keyword} setSearchActive={setSearchActive} />
      ) : (
        ""
      )}
      <div className="notes-section mt-20">
        <h1 className="font-semibold mb-14 text-brightblack ">Notes</h1>
        {notes.length === 0 ? (
          <p className="text-2xl flex flex-col gap-2 text-[#6b7280]">
            No notes found.
            <span> Start creating notes to remember everything important.</span>
          </p>
        ) : (
          <div className="notes-wrapper">
            {notes.map((note, index) => {
              return (
                <div
                  className={`el p-6 h-64 text-brightblack flex flex-col cursor-pointer justify-between ${
                    colors[index % colors.length]
                  }`}
                  onClick={() => getNoteDetails(note._id)}
                  key={note._id}
                >
                  <div className="title capitalize">{note.title}</div>
                  <div
                    className="date text-lightblack font-light
"
                  >
                    {" "}
                    {FormatDate(note.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Notes;
