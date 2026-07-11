import { useState, useEffect } from "react";
import api from "../api/gameApi";
import { useNavigate } from "react-router-dom";
import "./CreateGame.css";

function CreateGame() {
    const [playerName, setPlayerName] = useState("");
    const [game, setGame] = useState(null);
    const navigate = useNavigate();
    const [canStart, setCanStart] = useState(false);
    const [joinPlayerName, setJoinPlayerName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    

    useEffect(() => {
    if (!game) return;

    const interval = setInterval(async () => {
        try {
            const res = await api.get(`/Game/${game.roomCode}`);

            if (res.data.players.length === 2) {
                setCanStart(true);
                clearInterval(interval);
            }
        } catch (err) {
            console.error(err);
        }
    }, 2000);

    return () => clearInterval(interval);
}, [game]);
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
    const joinRoom = async () => {
    try {
        const response = await api.post("/Game/join", {
    playerName: joinPlayerName,
    roomCode: roomCode.toUpperCase()
});

        localStorage.setItem("playerId", response.data.playerId);

        navigate(`/game/${roomCode.toUpperCase()}`);
    }
    catch (err) {
        alert(err.response?.data || "Unable to join room.");
    }
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
    disabled={!playerName.trim()}
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
                    {!canStart && (
            <p
                style={{
                    color: "#ccc",
                    marginTop: "15px",
                    fontSize: "16px"
                }}
            >
                ⏳ Waiting for another player to join...
            </p>
        )}

                    <button
    onClick={() => navigate(`/game/${game.roomCode}`)}
    disabled={!canStart}
    style={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: canStart ? "green" : "gray",
        color: "white",
        border: "none",
        cursor: canStart ? "pointer" : "not-allowed",
        opacity: canStart ? 1 : 0.7
    }}
>
    🚀 Start Game
</button>

                </div>
            )}
            {!game && (
    <>
            <div className="divider">
                        <span>OR</span>
            </div>
                <input
    className="join-input"
    type="text"
    placeholder="Enter your name"
    value={joinPlayerName}
    onChange={(e) => setJoinPlayerName(e.target.value)}
/>
            <input
                className="name-input"
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            />

            <button
                className="join-btn"
                onClick={joinRoom}
                disabled={!joinPlayerName.trim() || !roomCode.trim()}
            >
                🚪 Join Room
            </button>
            </>
)}

                    </div>

    </div>
);
}

export default CreateGame;
