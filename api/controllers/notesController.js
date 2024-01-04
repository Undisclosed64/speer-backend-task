const Note = require("../models/Notes");

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

    const notes = await Note.find({ user: userId }).populate("user").exec();

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
    console.log(note);
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
