const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("./models/user.model"); // Adjust the path to your User model

const app = express();
app.use(bodyParser.json());

// Include your signup route here
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email is taken" });
  }
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const newUser = new User({
    name: name,
    email: email,
    password: password,
    role: role || "user",
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

describe("POST /signup", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should not register a user with an existing email", async () => {
    await User.create({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });

    const res = await request(app).post("/signup").send({
      name: "John Doe",
      email: "jane@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email is taken");
  });

  it("should not register a user with missing fields", async () => {
    const res = await request(app).post("/signup").send({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  it("should not register a user with an invalid email", async () => {
    const res = await request(app).post("/signup").send({
      name: "John Doe",
      email: "invalid-email",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email");
  });
});
