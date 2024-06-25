const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Blog = require("./models/blog.model");
const blogRoutes = require("./routes/blogs.routes");
const e = require("express");
jest.mock("cloudinary", () => ({
  v2: {
    uploader: {
      upload: jest.fn(),
      destroy: jest.fn(),
    },
    config: jest.fn(),
  },
}));

const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());
app.use("/blogs", blogRoutes);

describe("Blog Routes", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Blog.deleteMany({});
  });

  describe("GET /blogs", () => {
    it("should fetch all blogs", async () => {
      const blog1 = await Blog.create({
        title: "Blog 1",
        description: "Content 1",
        imageUrl: "http://example.com/image1.jpg",
        imagePublicId: "image1",
      });
      const blog2 = await Blog.create({
        title: "Blog 2",
        description: "Content 2",
        imageUrl: "http://example.com/image2.jpg",
        imagePublicId: "image2",
      });

      const res = await request(app).get("/blogs");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]._id).toBe(blog1.id);
      expect(res.body[1]._id).toBe(blog2.id);
    });
  });

  describe("POST /blogs", () => {
    it("should create   a new blog", async () => {
      await cloudinary.uploader.upload.mockResolvedValue({
        url: "http://example.com/image.jpg",
        public_id: "image123",
      });

      const res = await request(app)
        .post("/blogs")
        .field("title", "New Blog")
        .field("description", "New Content")
        .attach("image", Buffer.from("dummy file content"), "image.jpg");

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe("New Blog");
      expect(res.body.imageUrl).toBe("http://example.com/image.jpg");
    });
  });

  describe("DELETE /blogs/:id", () => {
    it("should delete a blog by ID", async () => {
      console.log("this is the beginning of deleting by id");
      const blog = await Blog.create({
        title: "Blog to delete",
        description: "Content to delete",
        imageUrl: "http://example.com/image.jpg",
        imagePublicId: "image123",
      });
      console.log("in delete test the blog is created,", blog);
      const blogId = blog._id.toString();
      console.log("this is my blog Id", blogId);
      await cloudinary.uploader.destroy.mockResolvedValue({ result: "ok" });
      const res = await request(app).delete(`/blogs/${blog._id}`);

      console.log("this is my delete response", res.status, res.body);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Blog deleted successfully");

      const deletedBlog = await Blog.findById(blog._id);
      expect(deletedBlog).toBeNull();
    }, 20000);
  });

  describe("PUT /blogs/:id", () => {
    it("should update a blog by ID", async () => {
      const blog = await Blog.create({
        title: "Blog to update",
        description: "Content to update",
        imageUrl: "http://example.com/image.jpg",
        imagePublicId: "image123",
      });

      cloudinary.uploader.upload.mockResolvedValue({
        url: "http://example.com/newimage.jpg",
        public_id: "newimage123",
      });

      const res = await request(app)
        .put(`/blogs/${blog._id}`)
        .field("title", "Updated Blog")
        .field("description", "Updated Content")
        .attach("image", Buffer.from("dummy file content"), "image.jpg");
      console.log("this is the put response", res.statusCode, res.body.title);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Updated Blog");
      expect(res.body.imageUrl).toBe("http://example.com/newimage.jpg");

      const updatedBlog = await Blog.findById(blog._id);
      expect(updatedBlog.title).toBe("Updated Blog");
      expect(updatedBlog.imageUrl).toBe("http://example.com/newimage.jpg");
    });
  });
});
