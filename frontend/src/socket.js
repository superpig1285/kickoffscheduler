import { io } from "socket.io-client";

export const socket = io("https://backend-summer-feather-325.fly.dev", {
    transports: ["websocket"],
    secure: true,
    reconnectionAttempts: 3,
});
