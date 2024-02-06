const express = require("express");

const router = express.Router();

const { agentSignUp, agentLogIn } = require("../../controllers/agent/agentSignUp");

router.post("/sign-up", agentSignUp);

router.post('/log-in', agentLogIn)

module.exports = router;
