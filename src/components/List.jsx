import useDragAndDrop from "../hooks/useDragAndDrop";
import Card from "./Card";

export default function List({ list }) {
    const {
        hoveredList,
        setHoveredList,
        setHoveredCard,
        handleDragOverList,
        handleDropOnList,
        handleDragStartList,
    } = useDragAndDrop();

    return (
        <div
            data-list-id={list.id}
            data-item-type="list"
            draggable
            onDragStart={(e) => handleDragStartList(e, list)}
            onDragOver={(e) => handleDragOverList(e, list)}
            onDrop={(e) => {
                handleDropOnList(e, list);
                setHoveredList({});
                setHoveredCard({});
            }}
            className="list-item"
            style={{
                ...(hoveredList?.id === list.id &&
                hoveredList.position === "left"
                    ? { borderLeftColor: "blue" }
                    : {}),
                ...(hoveredList?.id === list.id &&
                hoveredList.position === "right"
                    ? { borderRightColor: "blue" }
                    : {}),
            }}
        >
            <div
                style={{
                    width: "100%",
                    overflow: "auto",
                    wordBreak: "break-all",
                    hyphens: "auto",
                    whiteSpace: "pre-wrap",
                    cursor: "grab",
                }}
            >
                {list.title}
            </div>
            <div
                style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "250px",
                    overflow: "scroll",
                    padding: "10px",
                }}
            >
                {list.cards.map((card) => {
                    return <Card key={card.id} card={card} />;
                })}

                {list.cards.length === 0 && (
                    <p style={{ textAlign: "center", color: "#aaa" }}>
                        Drop here
                    </p>
                )}
            </div>
        </div>
    );
}
