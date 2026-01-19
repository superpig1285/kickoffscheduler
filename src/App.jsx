import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Components/Calendar";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>I love you Julia Hope Boylan</h1>
            <Calendar />
        </>
    );
}

export default App;
