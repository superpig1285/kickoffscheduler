import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Components/Calendar";
import { io } from "socket.io-client";
import { socket } from "./socket";

function App() {
    const [cursors, setCursors] = useState({});

    useEffect(() => {
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

    useEffect(() => {
        let lastSent = 0;

        const handleMove = (e) => {
            const now = Date.now();

            if (now - last < 30) return;
            lastSent = now;

            socket.emit("cursor", {
                x: e.clientx,
                y: e.clienty,
                roomId: "schedule-123",
                name: "Wilber",
            });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const [count, setCount] = useState(0);

    const socket = io("https://backend-summer-feather-325.fly.dev/", {
        transports: ["websocket"],
        secure: true,
    });

    socket.on("connect", () => {
        console.log("Connected:", socket.id);
    });

    return (
        <>
            <h1>Kickoff Scheduler</h1>
            <Calendar />
            {Object.values(cursors).map((cursor) => (
                <div
                    key={cursor.id}
                    style={{
                        position: "fixed",
                        left: cursor.x,
                        right: cursor.y,
                        transform: "translate(-50%, 50%)",
                        pointerEvents: "none",
                        zIndex: 9999,
                        color: cursor.color || "red",
                    }}
                >
                    {cursor.name}
                </div>
            ))}
        </>
    );
}

export default App;
