require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const agentRouter = require("./routes/agent/agentRoutes");

const vendorRouter = require('./routes/vendor/vendorRoutes')

app.use("/agent", agentRouter);

app.use('/vendor', vendorRouter);

app.listen(PORT, () => {
  console.log(`server runnning successfully on PORT ${PORT}`);
});
