const Note = require("../models/Notes");
const shortid = require("shortid"); // Import a library for generating short and unique identifiers
const nodemailer = require("nodemailer"); //
const baseURL = "http://localhost:5000";

//post note
exports.createNote = async (req, res) => {
  try {
    const userId = req.user.id;

    //create note
    let note = new Note(req.body);
    note.user = userId;

    const created_note = await note.save();
    await created_note.populate("user");

    const response = {
      id: created_note._id,
      title: created_note.title,
      content: created_note.content,
      user: created_note.user._id,
      createdAt: created_note.createdAt,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//get notes
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await Note.find({ user: userId }).exec();

    //console.log(notes);
    res.status(200).json(notes);
  } catch (err) {
    //console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a particular note
exports.getNote = async (req, res) => {
  try {
    const id = req.params.id;
    // Check if the provided ID is not valid
    if (!id) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    const note = await Note.findById(id).exec();
    // Check if the note with the provided ID was not found
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    // console.log(note);
    res.status(200).json(note);
  } catch (err) {
    //console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update note
exports.updateNote = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the provided ID is not valid
    if (!id) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    const existingNote = await Note.findById(id);
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title || existingNote.title,
          content: req.body.content || existingNote.content,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    ).exec();

    res.status(200).json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete note
exports.deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the provided ID is not valid
    if (!id) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }
    await Note.findByIdAndDelete(id).exec();
    res.status(200).json({ msg: "successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.shareNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    // Find the note by ID
    const note = await Note.findById(noteId).exec();

    // Check if the note exists
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Generate a unique shareable link
    const shareableLink = shortid.generate();

    const sharedNote = await Note.updateOne(
      { _id: noteId },
      { $set: { shareableLink: shareableLink } },
      { upsert: true }
    ).exec();

    const fullShareableLink = `http://localhost:5173/notes/shared/${shareableLink}`;

    // Provide the shareable link to the user
    res.status(200).json({ fullShareableLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sharedNoteViewer = async (req, res) => {
  try {
    const linkId = req.params.id;
    console.log(linkId);
    // Check if the provided ID is not valid
    if (!linkId) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    const note = await Note.findOne({ shareableLink: linkId })
      .populate("user")
      .exec();
    // console.log(note);
    // Check if the note with the provided ID was not found
    if (!note) {
      // console.log("not found");
      return res.status(404).json({ error: "Note not found" });
    }
    // console.log(note);
    res.status(200).json(note);
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.noteByKeyword = async (req, res) => {
  try {
    const keyword = req.query.q;
    const userid = req.user.id;
    if (!keyword) {
      return res.status(400).json({ error: "Keyword not provided!" });
    }

    const notes = await Note.find({
      user: userid,
      $or: [
        { title: { $regex: "\\b" + keyword + "\\b", $options: "i" } },
        { content: { $regex: "\\b" + keyword + "\\b", $options: "i" } },
      ],
    }).exec();

    if (!notes) {
      return res.status(404).json({ error: "No notes found for the keyword." });
    }

    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
