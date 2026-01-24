import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Components/Calendar";
import { io } from "socket.io-client";
import { socket } from "./socket";
import CreateNewRoomIcon from "../public/plus.svg?react";
import JoinRoomIcon from "../public/open_door.svg?react";

function App() {
    const [cursors, setCursors] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [searchText, setSearchText] = useState("");
    const [checked, setChecked] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const res = await fetch("https://backend-summer-feather-325.fly.dev/roomList");
                if (!res.ok) throw new Error("Failed to fetch rooms");
                const data = await res.json();
                setRooms(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadRooms();
    }, []);

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
            <div className="upper_left_controls_and_title_container">
                <h2 className="title">Kickoff Scheduler</h2>

                <button className="icon-button" onClick={() => setOpenSearch((o) => !o)}>
                    <img src={JoinRoomIcon} /> Join a room
                </button>
                <div className={`search-room-input-wrapper ${openSearch ? "open" : ""}`}>
                    <div className="current-rooms-list">
                        <input type="text" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                        <ul>
                            {rooms.map((room) => (
                                <li className="room-list-object" key={room.id}>
                                    {room}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button className="icon-button" onClick={() => setOpenCreate((o) => !o)}>
                    <img src={CreateNewRoomIcon} /> New room
                </button>
                <div className={`room-input-wrapper ${openCreate ? "open" : ""}`}>
                    <input
                        name="room_name"
                        type="text"
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    ></input>
                    <label>
                        <input
                            name="require_password"
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        ></input>
                        Require Password
                    </label>
                </div>
                {openCreate && roomName != "" && <button className="create-room-button">Create</button>}
            </div>

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
