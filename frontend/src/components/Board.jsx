import boardImage from "../assets/board.png";

const MAX_BOARD_SIZE = 540;

const boardSize = Math.min(
    MAX_BOARD_SIZE,
    window.innerWidth < 600
        ? window.innerWidth - 30
        : MAX_BOARD_SIZE
);

const GRID_OFFSET = boardSize * (9 / 540);
const GRID_SIZE = boardSize * (522 / 540);

const CELL_SIZE = GRID_SIZE / 10;

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

const tokenOffset =
    player.playerOrder === 1
        ? { x: -10, y: -10 }
        : { x: 10, y: 10 };

                return (
                    <div
                        key={player.id}
                        style={{
                            position: "absolute",
                            left: left - 13 + tokenOffset.x,
top: top - 13 + tokenOffset.y,
                            width: 26,
height: 26,
                            borderRadius: "50%",
                            backgroundColor:
                                player.playerOrder === 1 ? "#ff3b30" : "#007aff",
                            color: "white",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "center",
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