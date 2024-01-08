const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const verify = require("../verifyUser");
const rateLimiter = require("../rate-limiter");

router.post(
  "/notes",
  verify,
  rateLimiter.rateLimitter,
  notesController.createNote
);

router.get("/notes", verify, notesController.getAllNotes);

//important to be here to prevent conflict with getNote
router.get(
  "/notes/search",
  verify,
  rateLimiter.rateLimitter,
  notesController.noteByKeyword
);

router.get("/notes/:id", verify, notesController.getNote);

router.put(
  "/notes/:id",
  verify,
  rateLimiter.rateLimitter,
  notesController.updateNote
);

router.delete("/notes/:id", verify, notesController.deleteNote);

router.post(
  "/notes/:id/share",
  verify,
  rateLimiter.rateLimitter,
  notesController.shareNote
);

router.get("/notes/shared/:id", notesController.sharedNoteViewer);

module.exports = router;
