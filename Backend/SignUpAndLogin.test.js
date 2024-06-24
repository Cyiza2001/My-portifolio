const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

// Include your signup route here
app.post("/signup", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required!" });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
describe("POST /signup and POST/login", () => {
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
    await User.deleteMany({});
  });
  // The following tests works for signup
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

  // The tests for login endpoints

  /****************************It should check if all fields are filled**********************************************/
  it("should check if all fields are filled", async () => {
    const res = await request(app).post("/login").send({
      email: "",
      password: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required!");
  });

  /********************Check if the user is registered in the database by his email***************** */
  it("should first find a user in the database by his email", async () => {
    const res = await request(app).post("/login").send({
      email: "mapyaka@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
  /****************************Check if the user password matches the registered one ********************* */
  it("should check the password of the user", async () => {
    await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const res = await request(app).post("/login").send({
      email: "john@example.com",
      password: "invalid-password",
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  /********if the user has correct credentials should be logged in********************* */
  it("should login an existing user", async () => {
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    const res = await request(app).post("/login").send({
      email: "john@example.com",
      password: "password123",
    });
    expect(JSON.parse(res.text).token).toBe(token);
  });
});
