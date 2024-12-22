import { useContext } from "react";
import DragAndDropContext from "../context/DragAndDropContext.jsx";

export default function useDragAndDrop() {
    return useContext(DragAndDropContext);
}
