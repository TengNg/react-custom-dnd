import useDragAndDrop from "../hooks/useDragAndDrop";

export default function Card({ card }) {
    const {
        hoveredCard,
        setHoveredCard,
        draggingCard,
        handleDrop,
        handleDragOver,
        handleDragStart,
    } = useDragAndDrop();

    const isDragging = draggingCard?.id === card.id;

    return (
        <div
            data-item-type="card"
            draggable
            onDragStart={(e) => handleDragStart(e, card)}
            onDragOver={(e) => handleDragOver(e, card)}
            onDrop={(e) => {
                handleDrop(e, card);
                setHoveredCard({});
            }}
            style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor: "#f0f0f0",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "5px",
                borderTopColor: isDragging ? "blue" : "#ccc",
                borderBottomColor: isDragging ? "blue" : "#ccc",
                borderLeftColor: isDragging ? "blue" : "#ccc",
                borderRightColor: isDragging ? "blue" : "#ccc",
                textAlign: "center",
                cursor: "grab",
                opacity: isDragging ? 0.5 : 1,
                ...(hoveredCard?.id === card.id &&
                hoveredCard.position === "above"
                    ? { borderTopColor: "blue" }
                    : {}),
                ...(hoveredCard?.id === card.id &&
                hoveredCard.position === "below"
                    ? { borderBottomColor: "blue" }
                    : {}),
            }}
        >
            {card.content} [{card.id}]
        </div>
    );
}
