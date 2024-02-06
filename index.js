require('dotenv').config()

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(express.urlencoded({extended: true}));



const agentRouter = require('./routes/agent/agentRoutes')
 
app.use('/agent', agentRouter);

app.listen(PORT, ()=>{
    console.log(`server runnning successfully on PORT ${PORT}`)
}) 