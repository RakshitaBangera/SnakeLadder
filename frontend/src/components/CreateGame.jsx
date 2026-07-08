import { useState } from "react";
import api from "../api/gameApi";
import { useNavigate } from "react-router-dom";
import "./CreateGame.css";

function CreateGame() {
    const [playerName, setPlayerName] = useState("");
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    const createGame = async () => {
        try {
            const response = await api.post("/Game/create", {
                playerName
            });

            setGame(response.data);

            // store playerId
            localStorage.setItem("playerId", response.data.playerId);

        } catch (error) {
            alert("Failed to create game.");
            console.error(error);
        }
    };

    const copyLink = () => {
        const link = `${window.location.origin}/join/${game.roomCode}`;
        navigator.clipboard.writeText(link);
        alert("Link copied!");
    };

    return (
    <div className="create-page">

        <div className="create-card">

            <h1 className="create-title">
                🎲 Snake & Ladder
            </h1>

            <p className="create-subtitle">
                Challenge your friends online
            </p>

            <input
                className="name-input"
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />

            <button
                className="create-btn"
                onClick={createGame}
            >
                🎮 Create Room
            </button>

            {game && (
                <div className="room-box">

                    <h3>🎉 Room Created</h3>

                    <p>
                        <b>Room Code:</b> {game.roomCode}
                    </p>

                    <p>
                        <b>Invite Link</b>
                    </p>

                    <p>
                        {`${window.location.origin}/join/${game.roomCode}`}
                    </p>

                    <button
                        className="copy-btn"
                        onClick={copyLink}
                    >
                        📋 Copy Invite Link
                    </button>

                    <button
                        className="start-btn"
                        onClick={() => navigate(`/game/${game.roomCode}`)}
                    >
                        🚀 Start Game
                    </button>

                </div>
            )}

        </div>

    </div>
);
}

export default CreateGame;
