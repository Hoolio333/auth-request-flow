const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = process.env.JWT_SECRET;

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== mockUser.username || password !== mockUser.password) {
    return res.status(401).json({ error: "Invalid username or passowrd" });
  }
  // Create a new JWT; the payload should be an object containing the mock user's username
  const token = jwt.sign({ username }, secret);
  // send the JWT back to the client in a json response
  res.json({ token });
});

router.get("/profile", (req, res) => {
  // Get the token from the authorization header of the request
  const [bearer, token] = req.headers.authorization.split(" ");
  console.log(token);
  // use console logs to inspect the req object to figure out how to find this.
  // use the jsonwebtoken library to verify that the token is valid.
  try {
    const payload = jwt.verify(token, secret);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  // Respond with the mock users profile if the token is valid, or a failure message if it isn't.
  res.json({ data: mockUser.profile });
});

module.exports = router;
