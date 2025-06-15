const db = require("../db/index");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("GET /api/allnoises - Get all noises", () => {
  test("Status 200: returns an of all noises with their IDs", () => {
    return request(app)
      .get("/api/allnoises")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        body.forEach((noise) => {
          expect(noise).toHaveProperty("id");
          expect(noise).toHaveProperty("noise");
        });
      });
  });
});

describe("POST /api/noises - Post new suggestion to noises", () => {
  test("Status 201: posts new suggestion to noises db and returns suggestion", () => {
    const noise = {
      noise: "Cow",
    };

    return request(app)
      .post("/api/noises")
      .send(noise)
      .expect(201)
      .then(({ body }) => {
        expect(body.noise).toBe("Cow");
      });
  });
});

describe("GET /api/noises - Get random noise suggestion", () => {
  test("Status 200: returns a random noise suggestion from the database", () => {
    return request(app)
      .get("/api/noises")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("noise");
      });
  });
});

describe("DELETE /api/noises/:id - Delete noise by ID", () => {
  test("Status 204: Deletes noise by ID", () => {
    return request(app).delete("/api/noises/1").expect(204);
  });
});
