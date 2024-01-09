const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const notesRouter = require("./routes/notes");
require("dotenv").config();
const cors = require("cors");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// const corsOptions = {
//   origin: ["https://scribe-note-taker.vercel.app", "http://localhost:5173"],
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", userRouter, notesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
