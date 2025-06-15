const express = require("express");
const app = express();
const cors = require("cors");

const {
  getAllNoises,
  postNewNoiseSuggestion,
  getRandomNoise,
  deleteNoiseById,
} = require("./controllers/controllers.js");

// MIDDLEWARE

app.use(express.json());
app.use(cors());

// GET ALL NOISES

app.get("/api/allnoises", getAllNoises);

// ADD NEW NOISE

app.post("/api/noises", postNewNoiseSuggestion);

// GET RANDOM NOISE

app.get("/api/noises", getRandomNoise);

// DELETE NOISE BY ID

app.delete("/api/noises/:id", deleteNoiseById);

module.exports = app;
