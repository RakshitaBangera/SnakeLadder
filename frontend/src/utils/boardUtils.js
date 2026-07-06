export function getCellPosition(cell) {

    const index = cell - 1;

    const row = Math.floor(index / 10);

    let col = index % 10;

    // Reverse every second row
    if (row % 2 === 1) {
        col = 9 - col;
    }

    return {
        row,
        col
    };
}