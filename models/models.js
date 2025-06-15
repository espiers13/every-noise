const db = require("../db/index");

exports.returnAllNoises = () => {
  return db.query(`SELECT * FROM noises;`).then(({ rows }) => {
    return rows;
  });
};

exports.addNewSuggestion = (noise) => {
  return db
    .query(`INSERT INTO noises (noise) VALUES ($1) RETURNING *;`, [noise])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.findRandomNoise = () => {
  return db.query(`SELECT id FROM noises;`).then(({ rows }) => {
    const randomID = rows[Math.floor(Math.random() * rows.length)].id;
    return db
      .query(`SELECT * FROM noises WHERE id = $1`, [randomID])
      .then(({ rows }) => {
        return rows[0];
      });
  });
};

exports.removeNoiseById = (id) => {
  return db
    .query(`DELETE FROM noises WHERE id = $1 RETURNING *;`, [id])
    .then(({ rows }) => {
      return rows;
    });
};
