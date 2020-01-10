const express = require("express"),
  auth = require("../middleware/auth");

const logoutCurrentUserSession = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const logoutCurrentUserSessionRoute = express.Router();
logoutCurrentUserSessionRoute.post(
  "/logoutCurrentUserSession",
  auth,
  logoutCurrentUserSession
);

module.exports = logoutCurrentUserSessionRoute;
