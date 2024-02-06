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

describe("post method", () => {
  test("adds blogs correctly to db", async () => {
    const newBlog = {
      title: "fullstack",
      author: "niilo lehtonen",
      url: "www.fs.fi",
      likes: 8,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("fullstack");
  });
});

describe("likeField", () =>
  test("defaults to 0", async () => {
    const newBlog = {
      title: "fullstack",
      author: "niilo lehtonen",
      url: "www.fs.fi",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const blog = blogsAtEnd.find((blog) => blog.title === "fullstack");
    expect(blog.likes).toBe(0);
  }));

describe("post is responding correctly", () => {
  test("when the blog doesn't include a title field", async () => {
    const newBlog = {
      author: "niilo lehtonen",
      url: "www.fs.fi",
      likes: 1,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
  test("when the blog doesn't include a title field", async () => {
    const newBlog = {
      title: "fullstack",
      author: "niilo lehtonen",
      likes: 1,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
