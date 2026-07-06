import { useEffect, useState } from "react";

function BoardOverlay() {

    const [lines, setLines] = useState([]);

    useEffect(() => {

        const temp = [];

        for (let i = 1; i <= 100; i++) {

            const cell = document.getElementById(`cell-${i}`);

            if (!cell) continue;

            const rect = cell.getBoundingClientRect();

            temp.push({
                number: i,
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
        }

        setLines(temp);

    }, []);

    return null;
}

export default BoardOverlay;