import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/gameApi";
import MovePopup from "../components/MovePopup";
import Board from "../components/Board";

const playerId = localStorage.getItem("playerId");

function GamePage() {
    
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
const [moveType, setMoveType] = useState("");

    // Get the current player's ID from localStorage
    const playerId = localStorage.getItem("playerId");

    const fetchGame = async () => {
        try {
            const res = await api.get(`/Game/${roomCode}`);
            setGame(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGame();

        const interval = setInterval(fetchGame, 2000);

        return () => clearInterval(interval);
    }, [roomCode]);

    const rollDice = async () => {
        if (!game) return;

        try {
            const res = await api.post("/Game/roll", {
                gameId: game.gameId,
                playerId: playerId
            });

            setMessage(res.data.message);
            if (res.data.data.moveType !== "Normal") {
            setMoveType(res.data.data.moveType);
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
            }, 2500);
        }
            fetchGame();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error rolling dice");
        }
    };

    const exitGame = async () => {
    const confirmExit = window.confirm(
        "Are you sure you want to leave the game?"
    );

    if (!confirmExit) return;

    try {
        await api.post("/Game/exit", {
            gameId: game.gameId,
            playerId: playerId
        });

        localStorage.removeItem("playerId");

        navigate("/");
    } catch (err) {
        alert("Failed to exit the game.");
        console.error(err);
    }
};

    if (game === null) {
        return <h2>Loading game...</h2>;
    }
     // ✅ Invalid game
    if (!game || !game.roomCode) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>🎮 Game not found or expired</h2>
                <p>Please create a new game.</p>

                <button onClick={() => navigate("/")}>
    🔁 Create New Game
</button>
            </div>
        );
    }

    // ✅ Finished game
    if (game.status === "Finished") {

    if (game.exitedPlayerId) {
        return (
            <>
                <h1>🚪 Game Ended</h1>
                <h2>The other player left the game.</h2>

                <button onClick={() => navigate("/")}>
                    Create New Game
                </button>
            </>
        );
    }

    // Otherwise, it's a normal win
}

    return (
        <div>
            <MovePopup
    show={showPopup}
    moveType={moveType}
/>
            <h1>🎮 Game Lobby</h1>

            <h2>Room: {game.roomCode}</h2>

            <p>Status: {game.status}</p>

            <hr />
            <h2>
    🎯 Current Turn: {game.currentTurnPlayerName || "Loading..."}
</h2>

            <h3>Players</h3>

            <ul>
    {(game.players || []).map((p) => (
        <li
            key={p.id}
            style={{
                fontWeight:
                    p.id === game.currentTurnPlayerId ? "bold" : "normal",
                color:
                    p.id === game.currentTurnPlayerId ? "green" : "black"
            }}
        >
            {p.name} (Position: {p.position})
        </li>
    ))}
</ul>
    <Board players={game.players} />

            <hr />
            
            {game.status === "InProgress" ? (
    <button
        onClick={rollDice}
        disabled={game.currentTurnPlayerId !== playerId}
    >
        🎲 Roll Dice
    </button>
) : (
    <p>Game Over</p>
)}      
    
            <p>{message}</p>

            <br />
<br />

<button
    onClick={exitGame}
    style={{
        backgroundColor: "#d9534f",
        color: "white",
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }}
>
    🚪 Exit Game
</button>
        </div>
    );
}

export default GamePage;