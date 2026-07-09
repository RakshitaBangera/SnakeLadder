import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/gameApi";
import "./CreateGame.css";

function JoinGame() {
    const { roomCode: urlRoomCode } = useParams();

    const [playerName, setPlayerName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (urlRoomCode) {
            setRoomCode(urlRoomCode.toUpperCase());
        }
    }, [urlRoomCode]);

    const joinGame = async () => {
        try {
            const response = await api.post("/Game/join", {
                playerName,
                roomCode
            });

            localStorage.setItem("playerId", response.data.playerId);

            setMessage("✅ Joined successfully!");

            setTimeout(() => {
                navigate(`/game/${roomCode}`);
            }, 800);

        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage("Unable to connect to server.");
            }
        }
    };

    return (
        <div className="create-page">

            <div className="create-card">

                <h1 className="create-title">
                    🎲 Snake & Ladder
                </h1>

                <p className="create-subtitle">
                    Join your friend's game
                </p>

                <input
                    className="name-input"
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />

                <br /><br />

                <input
                    className="name-input"
                    type="text"
                    placeholder="Room Code"
                    value={roomCode}
                    onChange={(e) =>
                        setRoomCode(e.target.value.toUpperCase())
                    }
                />

                <button
                    className="create-btn"
                    onClick={joinGame}
                >
                    🚪 Join Room
                </button>

                {message && (
                    <div
                        style={{
                            marginTop: "25px",
                            color: "#39d353",
                            fontSize: "18px",
                            fontWeight: "bold"
                        }}
                    >
                        {message}
                    </div>
                )}

            </div>

        </div>
    );
}

export default JoinGame;