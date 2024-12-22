import useDragAndDrop from "../hooks/useDragAndDrop";
import Card from "./Card";

export default function List({ list }) {
    const { handleDragOver, handleDropOnList, handleDragStartList } =
        useDragAndDrop();

    return (
        <div
            data-item-type="list"
            draggable
            onDragStart={() => handleDragStartList(list)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDropOnList(e, list)}
            style={{
                width: "250px",
                minWidth: "250px",
                height: "300px",
                padding: "20px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                overflow: "auto",
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
