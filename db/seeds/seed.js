const db = require("../index.js");
const format = require("pg-format");

const seed = ({ noisesData }) => {
  return db
    .query(`DROP TABLE IF EXISTS noises;`)
    .then(() => {
      return db.query(`
        CREATE TABLE noises (   
          id SERIAL PRIMARY KEY,
          noise VARCHAR(255) NOT NULL
        );
      `);
    })
    .then(() => {
      const insertIntoNoisesString = format(
        "INSERT INTO noises (noise) VALUES %L RETURNING *;",
        noisesData.map(({ noise }) => [noise])
      );
      return db.query(insertIntoNoisesString);
    });
};

module.exports = seed;
