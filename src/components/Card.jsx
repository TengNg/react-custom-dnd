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
                borderTopColor: isDragging ? "blue" : "#ccc",
                borderBottomColor: isDragging ? "blue" : "#ccc",
                borderLeftColor: isDragging ? "blue" : "#ccc",
                borderRightColor: isDragging ? "blue" : "#ccc",
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
