import useDragAndDrop from "../hooks/useDragAndDrop";

export default function Card({ card }) {
    const { draggingCard, handleDrop, handleDragOver, handleDragStart } =
        useDragAndDrop();

    const isDragging = draggingCard?.id === card.id;

    return (
        <div
            data-item-type="card"
            draggable
            onDragStart={() => handleDragStart(card)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, card)}
            style={{
                padding: "10px",
                margin: "5px 0",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                borderColor: isDragging ? "blue" : "#ccc",
                textAlign: "center",
                cursor: "grab",
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {card.content} [{card.id}]
        </div>
    );
}
