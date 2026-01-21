const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://www.kickoffscheduler.app",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("backend running");
});

io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("cursor", (data) => {
        socket.broadcast.emit("cursor", {
            id: socket.id,
            ...data,
        });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("cursor-remove", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Backend listening on port 3000");
});
