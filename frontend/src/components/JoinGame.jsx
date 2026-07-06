import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/gameApi";
import { useNavigate } from "react-router-dom";

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

            
            setMessage(response.data.message);
            localStorage.setItem("playerId", response.data.playerId);

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
        <div>
            <h2>Join Game</h2>

            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            />

            <br /><br />

            <button onClick={joinGame}>
                Join Room
            </button>

            {message && (
                <>
                    <br /><br />
                    <strong>{message}</strong>
                </>
            )}
        </div>
    );
}

export default JoinGame;