function MovePopup({ show, message }) {
    if (!show || !message) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#222",
                color: "white",
                padding: "16px 28px",
                borderRadius: "12px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                fontSize: "18px",
                fontWeight: "600",
                zIndex: 1000,
                animation: "fadeIn .3s ease"
            }}
        >
            {message}
        </div>
    );
}

export default MovePopup;