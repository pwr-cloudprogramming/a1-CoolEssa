"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.get("/", (req, res) => {
    res.sendStatus(200);
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("joinRoom", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log("user is trying to enter the room:", roomId);
        const connectedSockets = io.sockets.adapter.rooms.get(roomId);
        const socketRooms = Array.from(socket.rooms.values()).filter((room) => room !== socket.id);
        console.log("connected sockets:", connectedSockets);
        console.log("socket rooms:", socketRooms);
        if (socketRooms.length > 0) {
            socket.emit("joinRoomError", {
                errorMessage: "You have already joined this room!",
            });
            return;
        }
        if (connectedSockets && connectedSockets.size === 2) {
            socket.emit("joinRoomError", {
                errorMessage: "Room is full please choose another room to play!",
            });
            return;
        }
        yield socket.join(roomId);
        socket.emit("roomJoined");
        if (((_a = io.sockets.adapter.rooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.size) === 2) {
            socket.emit("startGame", { isPlayerOne: true });
            socket.to(roomId).emit("startGame", { isPlayerOne: false });
        }
    }));
    socket.on("leaveRoom", (roomId) => {
        console.log("user is trying to leave the room:", roomId);
        socket.leave(roomId);
        socket.to(roomId).emit("opponentLeft");
    });
    socket.on("cellClicked", ({ newGameStatus, roomId }) => {
        console.log(roomId);
        console.log(newGameStatus);
        socket.to(roomId).emit("opponentPlayed", newGameStatus);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
server.listen(PORT, () => {
    console.log("Server is running on port 5000");
});
