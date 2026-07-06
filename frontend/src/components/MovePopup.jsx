function MovePopup({ show, moveType }) {
    if (!show) return null;

    let title = "";
    let message = "";

    if (moveType === "Snake") {
        title = "🐍 Snake!";
        message = "Oops! A snake swallowed you!";
    } else if (moveType === "Ladder") {
        title = "🪜 Ladder!";
        message = "Awesome! You climbed a ladder!";
    }

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "25px 35px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                textAlign: "center",
                zIndex: 1000
            }}
        >
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default MovePopup;