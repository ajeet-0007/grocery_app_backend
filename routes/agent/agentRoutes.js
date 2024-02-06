const express = require('express');

const router = express.Router();

const {agentSignUp} = require('../../controllers/agent/agentSignUp')

router.post('/sign-up', agentSignUp);


module.exports = router;