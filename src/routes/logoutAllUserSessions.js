const express = require("express"),
  auth = require("../middleware/auth");

const logoutAllUserSessions = async (req, res) => {
  try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
  } catch (err) {
      res.status(500).send(err);
  }
};

const logoutAllUserSessionsRoute = express.Router();
logoutAllUserSessionsRoute.post(
  "/logoutAllUserSessions",
  auth,
  logoutAllUserSessions
);

module.exports = logoutAllUserSessionsRoute;