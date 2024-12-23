import useDragAndDrop from "../hooks/useDragAndDrop";
import Card from "./Card";

export default function List({ list }) {
    const {
        hoveredList,
        setHoveredList,
        handleDragOverList,
        handleDropOnList,
        handleDragStartList,
    } = useDragAndDrop();

    return (
        <div
            data-item-type="list"
            draggable
            onDragStart={(e) => handleDragStartList(e, list)}
            onDragOver={(e) => handleDragOverList(e, list)}
            onDrop={(e) => {
                handleDropOnList(e, list);
                setHoveredList({});
            }}
            style={{
                transform: "none",
                width: "250px",
                minWidth: "250px",
                height: "300px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                overflow: "auto",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "5px",
                borderTopColor: "gray",
                borderBottomColor: "gray",
                borderLeftColor: "gray",
                borderRightColor: "gray",
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
                }}
            >
                {list.title}
            </div>
            <div
                style={{
                    border: "1px solid gray",
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
