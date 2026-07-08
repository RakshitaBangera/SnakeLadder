import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/gameApi";
import MovePopup from "../components/MovePopup";
import Board from "../components/Board";
import "./GamePage.css";

function GamePage() {
    const { roomCode } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(null);
    const [message, setMessage] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const lastSeenEventId = useRef(null);

    const playerId = localStorage.getItem("playerId");

    const fetchGame = async () => {
    try {
        const res = await api.get(`/Game/${roomCode}`);

        setGame(res.data);

        // First time loading the page
        if (lastSeenEventId.current === null) {
            lastSeenEventId.current = res.data.lastEventId;
            return;
        }

        if (
            res.data.lastEventId &&
            res.data.lastEventId !== lastSeenEventId.current
        ) {
            lastSeenEventId.current = res.data.lastEventId;

            setPopupMessage(res.data.lastEventMessage);
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
            }, 4500);
        }
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

    if (game.status === "Finished" && game.exitedPlayerId) {
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

    return (
        <div className="game-page">

            <MovePopup
                show={showPopup}
                message={popupMessage}
            />

            <h1 className="game-title">
                🎮 Snake & Ladder
            </h1>

            <div className="main-container">

                <Board players={game.players} />

                <div className="right-panel">

                    <div className="player-card">
                        <h2>
                            🔴 {(game.players || [])[0]?.name || "Waiting..."}
                        </h2>

                        <p>
                            Position : {(game.players || [])[0]?.position ?? 0}
                        </p>

                        {game.currentTurnPlayerId ===
                            (game.players || [])[0]?.id && (
                            <p className="turn">
                                🎯 Your Turn
                            </p>
                        )}
                    </div>

                    <div className="player-card">
                        <h2>
                            🔵 {(game.players || [])[1]?.name || "Waiting..."}
                        </h2>

                        <p>
                            Position : {(game.players || [])[1]?.position ?? 0}
                        </p>

                        {game.currentTurnPlayerId ===
                            (game.players || [])[1]?.id && (
                            <p className="turn">
                                🎯 Your Turn
                            </p>
                        )}
                    </div>

                    <div className="player-card">
                        <h2>🎮 Game</h2>

                        <p>Room : {game.roomCode}</p>

                        <p>Status : {game.status}</p>
                    </div>

                    <button
                        className="roll-button"
                        onClick={rollDice}
                        disabled={game.currentTurnPlayerId !== playerId}
                    >
                        🎲 Roll Dice
                    </button>

                </div>

            </div>

            <div className="exit-container">
                <button
                    className="exit-button"
                    onClick={exitGame}
                >
                    🚪 Exit Game
                </button>
            </div>

            <div
                style={{
                    marginTop: "25px",
                    textAlign: "center",
                    fontSize: "22px"
                }}
            >
                {message}
            </div>

        </div>
    );
}

export default GamePage;