const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
require("./db/mongoose");
const routes = require("./routes");
const onConnection = require("./socket");

const app = express();
const port = process.env.PORT || 3100;

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
process.setMaxListeners(0);

app.get("/health-check", (req, res) => res.send("API is running"));

app.use("/api", routes);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.disconnectSockets();
io.on("connection", (socket) => onConnection(io, socket));

server.listen(port, () => {
  console.log("server is running on port " + port);
});
