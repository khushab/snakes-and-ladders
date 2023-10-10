const express = require("express");
const cors = require("cors");

require("./db/mongoose");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3200;

//middleware for maintanance
// app.use((req, res) => {
//     res.status(503).send("Server in maintainance. We'll be back soon!")
// })
app.use(cors());
app.use(express.json());

app.get("/health-check", (req, res) => res.send("API is running"));

app.use("/api", routes);

app.listen(port, () => {
  console.log("server is running on port " + port);
});
