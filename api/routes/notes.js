const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const verify = require("../verifyUser");

router.post("/notes", verify, notesController.createNote);

router.get("/notes", verify, notesController.getAllNotes);

router.get("/notes/:id", verify, notesController.getNote);

router.put("/notes/:id", verify, notesController.updateNote);

router.delete("/notes/:id", verify, notesController.deleteNote);

module.exports = router;
