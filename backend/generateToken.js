import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate a random secret key
const JWT_SECRET = crypto.randomBytes(64).toString("hex");

// Payload data
const payload = {
  username: "exampleUser",
  email: "user@example.com",
};

// Generate a token with the payload and secret key
const token = jwt.sign(payload, JWT_SECRET, {
  expiresIn: "1h", // Token expiration time
});

console.log("JWT Secret:", JWT_SECRET);
console.log("Generated JWT:", token);
