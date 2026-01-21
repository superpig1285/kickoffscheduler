import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Components/Calendar";
import { io } from "socket.io-client";

function App() {
    const [count, setCount] = useState(0);

    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
        console.log("Connected:", socket.id);
    });

    return (
        <>
            <h1>I love you Julia Hope Boylan</h1>
            <Calendar />
            <h1>Wilber</h1>
        </>
    );
}

export default App;
