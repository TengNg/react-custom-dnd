import useDragAndDrop from "../hooks/useDragAndDrop";
import List from "./List.jsx";

export default function Lists() {
    const { lists } = useDragAndDrop();

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                flexWrap: "nowrap",
                gap: "20px",
                overflow: "auto",
            }}
        >
            {lists.map((list) => {
                return <List key={list.id} list={list} />;
            })}
        </div>
    );
}
