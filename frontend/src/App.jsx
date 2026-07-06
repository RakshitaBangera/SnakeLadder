import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JoinPage from "./pages/JoinPage";
import GamePage from "./pages/GamePage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join/:roomCode" element={<JoinPage />} />
            <Route path="/game/:roomCode" element={<GamePage />} />
        </Routes>
    );
}

export default App;