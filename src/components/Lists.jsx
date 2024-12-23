import useDragAndDrop from "../hooks/useDragAndDrop";
import List from "./List.jsx";

export default function Lists() {
    const { lists } = useDragAndDrop();

    return (
        <div className="list-container">
            {lists.map((list) => {
                return <List key={list.id} list={list} />;
            })}
        </div>
    );
}
