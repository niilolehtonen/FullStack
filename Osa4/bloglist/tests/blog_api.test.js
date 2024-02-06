const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("get method", () => {
  test("returns right amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(2);
  });

  test("id is in correct format", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
