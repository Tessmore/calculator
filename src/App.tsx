import { useEffect, useState } from "react";
import "./App.scss";
import Calculator from "./components/Calculator";

function App() {
    const [text, setText] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get("v");
        if (param) {
            setText(decodeURIComponent(param));
        }
    }, []);

    return (
        <div className="container-fluid">
            <header className="container">
                <hgroup>
                    <h1>Calculator</h1>
                </hgroup>
            </header>

            <main className="container">
                <Calculator value={text} />
            </main>
        </div>
    );
}

export default App;
