const {
  returnAllNoises,
  addNewSuggestion,
  findRandomNoise,
  removeNoiseById,
} = require("../models/models.js");

exports.getAllNoises = (req, res, next) => {
  returnAllNoises().then((noises) => {
    res.status(200).send(noises);
  });
};

exports.postNewNoiseSuggestion = (req, res, next) => {
  const { noise } = req.body;

  addNewSuggestion(noise)
    .then((suggestionData) => {
      res.status(201).send(suggestionData);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRandomNoise = (req, res, next) => {
  findRandomNoise().then((noise) => {
    res.status(200).send(noise);
  });
};

exports.deleteNoiseById = (req, res, next) => {
  const { id } = req.params;

  removeNoiseById(id).then(() => {
    res.sendStatus(204);
  });
};
