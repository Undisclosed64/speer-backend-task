const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const verify = require("../verifyUser");

router.get("/notes/search", notesController.noteByKeyword);

router.post("/notes", verify, notesController.createNote);

router.get("/notes", verify, notesController.getAllNotes);

router.get("/notes/:id", verify, notesController.getNote);

router.put("/notes/:id", verify, notesController.updateNote);

router.delete("/notes/:id", verify, notesController.deleteNote);

router.post("/notes/:id/share", verify, notesController.shareNote);

router.get("/notes/shared/:id", notesController.sharedNoteViewer);

module.exports = router;
