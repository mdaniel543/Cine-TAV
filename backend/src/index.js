const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv/config");

const PORT = process.env.PORT || 3000;

//Routes    
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use("/api", require("./routes/index.routes"));

app.get("/", function (req, res) {
  res.json({ message: "Welcome to Cine-Tav application." });
});

//incio app
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
