import boardImage from "../assets/board.png";

const isMobile = window.innerWidth <= 768;

const boardSize = isMobile
    ? Math.min(window.innerWidth - 16, 450)
    : 450;

const GRID_OFFSET = boardSize * (9 / 540);
const GRID_SIZE = boardSize * (522 / 540);

const CELL_SIZE = GRID_SIZE / 10;

const TOKEN_SIZE = window.innerWidth < 768 ? 16 : 18;

function getCellCoordinates(position) {
    if (position === 0) {
    return {
        left: -25,
        top: BOARD_SIZE - 35
    };
}

    const row = Math.floor((position - 1) / 10);
    let col = (position - 1) % 10;

    if (row % 2 === 1) {
        col = 9 - col;
    }

    return {
        left: GRID_OFFSET + col * CELL_SIZE + CELL_SIZE / 2,
        top: GRID_OFFSET + (9 - row) * CELL_SIZE + CELL_SIZE / 2
    };
}

function Board({ players }) {
    return (
        <div
            style={{
                position: "relative",
               width: boardSize,
height: boardSize,
                backgroundImage: `url(${boardImage})`,
                backgroundSize: "100% 100%",
backgroundRepeat: "no-repeat",
backgroundPosition: "center",
                border: "2px solid black"
            }}
        >
            {players?.map((player) => {
                const { left, top } = getCellCoordinates(player.position);
const OFFSET = window.innerWidth < 600 ? 6 : 10;
const playersInSameCell = players.filter(
    p => p.position === player.position
).length;

const tokenOffset =
    playersInSameCell === 1
        ? { x: 0, y: 0 } // perfectly centered
        : player.playerOrder === 1
            ? { x: -OFFSET, y: -OFFSET }
            : { x: OFFSET, y: OFFSET };


                return (
                    <div
                        key={player.id}
                        style={{
                            position: "absolute",
                            left: left - TOKEN_SIZE / 2 + tokenOffset.x,
top: top - TOKEN_SIZE / 2 + tokenOffset.y - 2,
                            width: TOKEN_SIZE,
height: TOKEN_SIZE,
                            borderRadius: "50%",
                            backgroundColor:
                                player.playerOrder === 1 ? "#ff3b30" : "#007aff",
                            color: "white",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: TOKEN_SIZE * 0.45,
                            alignItems: "center",
                            transition: "all .5s ease-in-out",
                            boxShadow: "0 0 8px rgba(0,0,0,.4)",
                            zIndex: 100
                        }}
                    >
                        {player.name.charAt(0).toUpperCase()}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;