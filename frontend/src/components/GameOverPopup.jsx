import "./GameOverPopup.css";

function GameOverPopup({
    show,
    winnerName,
    loserName,
    onExit
}) {
    if (!show) return null;

    return (
        <div className="gameover-overlay">

            <div className="gameover-popup">

                <h1 className="trophy">🏆</h1>

                <h2 className="game-title-popup">
                    Snake & Ladder
                </h2>

                <h3 className="game-over-title">
                    Game Over
                </h3>

                <p className="winner">
                    🎉 <strong>{winnerName}</strong> Wins!
                </p>

                <p className="loser">
                    Better luck next time,
                    <br />
                    <strong>{loserName}</strong>
                </p>

                <button
                    className="gameover-btn"
                    onClick={onExit}
                >
                    🚪 Exit Game
                </button>

            </div>

        </div>
    );
}

export default GameOverPopup;