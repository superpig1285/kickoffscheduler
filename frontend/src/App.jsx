import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Components/Calendar";
import { io } from "socket.io-client";
import { socket } from "./socket";
import createNewRoomIcon from "../public/plus.svg";
import joinRoomIcon from "../public/open_door.svg";

function App() {
    const [cursors, setCursors] = useState({});

    useEffect(() => {
        socket.emit("join-room", "schedule-123");

        socket.on("cursor", (data) => {
            setCursors((prev) => ({
                ...prev,
                [data.id]: data,
            }));
        });

        socket.on("cursor-remove", (id) => {
            setCursors((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
        });

        return () => {
            socket.off("cursor");
            socket.off("cursor-remove");
        };
    }, []);

    useEffect(() => {}, []);

    useEffect(() => {
        let lastSent = 0;

        const handleMove = (e) => {
            const now = Date.now();

            if (now - lastSent < 30) return;
            lastSent = now;

            socket.emit("cursor", {
                x: e.clientX,
                y: e.clientY,
                roomId: "schedule-123",
                name: "Wilber",
            });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <>
            <button> {createNewRoomIcon}Create new room</button>
            <button>{joinRoomIcon}Join a room</button>
            <h1>Kickoff Scheduler</h1>
            <Calendar />
            {Object.values(cursors).map((cursor) => (
                <div
                    key={cursor.id}
                    style={{
                        position: "fixed",
                        left: cursor.x,
                        top: cursor.y,
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                        zIndex: 9999,
                        color: cursor.color || "red",
                        outline: "5px solid green",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: "2px solid #22c55e",
                        boxShadow: `
      0 0 4px rgba(22, 163, 74, 1),
    0 0 10px rgba(22, 163, 74, 0.9),
    0 0 20px rgba(22, 163, 74, 0.7),
    0 0 35px rgba(22, 163, 74, 0.5),
    0 0 55px rgba(22, 163, 74, 0.35);

    `,
                        pointerEvents: "none",
                    }}
                ></div>
            ))}
        </>
    );
}

export default App;
