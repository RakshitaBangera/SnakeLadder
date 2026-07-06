import { useState } from "react";
import api from "../api/gameApi";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Create Game</h2>

            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />

            <br /><br />

            <button onClick={createGame}>
                Create Room
            </button>

            {game && (
                <div style={{ marginTop: "20px" }}>
                    <h3>🎮 Room Created</h3>

                    <p><b>Room Code:</b> {game.roomCode}</p>

                    <p>
                        <b>Invite Link:</b><br />
                        {`${window.location.origin}/join/${game.roomCode}`}
                    </p>

                    <button onClick={copyLink}>
                        📋 Copy Invite Link
                    </button>
                </div>
            )}
            <button
    onClick={() => navigate(`/game/${game.roomCode}`)}
    style={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer"
    }}
>
    🚀 Start Game
</button>
        </div>
    );
}

export default CreateGame;
