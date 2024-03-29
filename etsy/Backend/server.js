const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/ind");
const morgan = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
const bodyParse = require("body-parser");
const connectDB = require("./database/conn");

const app = express();
app.use(express.json());

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 4001;
app.use(morgan("short"));

app.use(
  cors({
    origin: ["http://54.82.11.107:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyParse.urlencoded({ extended: true }));

//load routers
app.use("/", require("./routes/ind"));

app.use("/", require("./routes/router"));
app.use("/", require("./routes/productsRouter"));

app.listen(PORT_NUMBER, () => console.log(`server is listening on port ${PORT_NUMBER}`));
