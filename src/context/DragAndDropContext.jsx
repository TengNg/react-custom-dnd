import { useState, createContext } from "react";
import { lists as items } from "../data/lists";

const DragAndDropContext = createContext();

export function DragAndDropContextProvider({ children }) {
    const [lists, setLists] = useState(items);
    const [draggingCard, setDraggingCard] = useState(null);
    const [draggingList, setDraggingList] = useState(null);
    const [hoveredCard, setHoveredCard] = useState({});
    const [hoveredList, setHoveredList] = useState({});

    function handleDragStart(e, card) {
        setDraggingCard(card);
        setHoveredCard({});

        // hide the default drag image for better control
        const img = new Image();
        img.src = "";
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    function handleDragStartList(e, list) {
        setDraggingList(list);
        setHoveredList({});

        // hide the default drag image for better control
        const img = new Image();
        img.src = "";
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    function handleDragOver(e, card) {
        e.preventDefault();

        if (!draggingCard || draggingCard.id === card.id) {
            return;
        }

        const cardRect = e.currentTarget.getBoundingClientRect();
        const middleY = cardRect.top + cardRect.height / 2;

        if (e.clientY < middleY) {
            setHoveredCard({
                id: card.id,
                position: "above",
            });
        } else {
            setHoveredCard({
                id: card.id,
                position: "below",
            });
        }
    }

    function handleDragOverList(e, list) {
        e.preventDefault();

        if (draggingCard || draggingList.id === list.id) {
            return;
        }

        const listRect = e.currentTarget.getBoundingClientRect();
        const middleX = listRect.top + listRect.height / 2;

        if (e.clientX < middleX) {
            setHoveredList({
                id: list.id,
                position: "left",
            });
        } else {
            setHoveredList({
                id: list.id,
                position: "right",
            });
        }
    }

    function handleDrop(e, targetCard) {
        e.preventDefault();

        if (draggingCard === null) {
            alert("no dragging card found");
            return;
        }

        const newLists = [...lists];

        // Determine drop position
        const targetRect = e.target.getBoundingClientRect();
        const dropPosition =
            e.clientY < targetRect.top + targetRect.height / 2
                ? "above"
                : "below";

        // Get list-ids
        const sourceListId = draggingCard.listId;
        const targetListId = targetCard.listId;

        //  Handle dragging card on the same list ==========
        if (sourceListId === targetListId) {
            const currList = newLists.find((list) => list.id === sourceListId);
            const currCards = [...currList.cards];

            // Remove the card from the source list
            const draggedIndex = currCards.findIndex((c) => {
                return c.id === draggingCard.id;
            });

            // If the dragged-card is above the target-card
            // This means it's at the same position
            if (
                dropPosition === "below" &&
                currCards[draggedIndex - 1]?.id === targetCard.id
            ) {
                return;
            }

            // Get the moved-card
            const [removed] = currCards.splice(draggedIndex, 1);
            const targetIndex = currCards.findIndex((c) => {
                return c.id === targetCard.id;
            });

            if (dropPosition === "above") {
                currCards.splice(targetIndex, 0, removed);
            } else {
                currCards.splice(targetIndex + 1, 0, removed);
            }

            currList.cards = currCards;
            setLists(newLists);
            setDraggingCard(null);

            return;
        }

        // Get list by ids
        let sourceList = newLists.find((list) => list.id === sourceListId);
        let targetList = newLists.find((list) => list.id === targetListId);

        // Get cards from source/target lists
        const sourceCards = [...sourceList.cards];
        const targetCards = [...targetList.cards];

        // Remove the card from the source list
        const draggedIndex = sourceCards.findIndex((c) => {
            return c.id === draggingCard.id;
        });
        sourceCards.splice(draggedIndex, 1);

        // Find the target card index
        const targetIndex = targetCards.findIndex((c) => {
            return c.id === targetCard.id;
        });

        // Insert the card in the target list
        const dragged = { ...draggingCard, listId: targetCard.listId };
        if (dropPosition === "above") {
            targetCards.splice(targetIndex, 0, dragged);
        } else {
            targetCards.splice(targetIndex + 1, 0, dragged);
        }

        sourceList.cards = sourceCards;
        targetList.cards = targetCards;
        setLists(newLists);
        setDraggingCard(null);
    }

    function handleDropOnList(e, list) {
        e.preventDefault();

        // check if drop on the element with type is card
        // let the handleDrop method handle it
        const element = e.target;
        const itemType = element.dataset.itemType;

        // if item type is card, skip
        // let the handleDrop method handle it
        if (itemType === "card") {
            setDraggingCard(null);
            return;
        }

        // Handle drop list =========

        if (!draggingCard && draggingList) {
            const newLists = [...lists];
            const draggedIndex = newLists.findIndex((el) => {
                return el.id === draggingList.id;
            });

            const [removed] = newLists.splice(draggedIndex, 1);
            const targetRect = e.target.getBoundingClientRect();
            const dropPosition =
                e.clientX < targetRect.left + targetRect.width / 2
                    ? "left"
                    : "right";

            const targetIndex = newLists.findIndex((el) => {
                return el.id === list.id;
            });

            if (dropPosition === "left") {
                newLists.splice(targetIndex, 0, removed);
            } else {
                newLists.splice(targetIndex + 1, 0, removed);
            }

            setLists(newLists);
            setDraggingList(null);
            return;
        }

        // Handle drop card to list =========

        const newLists = [...lists];

        const sourceList = newLists.find((el) => {
            return el.id === draggingCard.listId;
        });

        // if you drop this card on the same list and in the list-area
        if (sourceList.id === list.id) {
            setDraggingCard(null);
            return;
        }

        const sourceCards = [...sourceList.cards];
        const draggedIndex = sourceCards.findIndex((c) => {
            return c.id === draggingCard.id;
        });

        const [removed] = sourceCards.splice(draggedIndex, 1);
        const movedCard = { ...removed, listId: list.id };
        list.cards.push(movedCard);

        const targetList = newLists.find((el) => {
            return el.id === list.id;
        });

        sourceList.cards = sourceCards;
        targetList.cards = list.cards;

        setLists(newLists);
        setDraggingCard(null);
    }

    return (
        <DragAndDropContext.Provider
            value={{
                lists,
                setLists,

                draggingCard,
                setDraggingCard,

                hoveredCard,
                hoveredList,
                setHoveredCard,
                setHoveredList,

                draggingList,
                setDraggingList,

                handleDragStartList,
                handleDragStart,

                handleDragOver,
                handleDragOverList,

                handleDrop,
                handleDropOnList,
            }}
        >
            {children}
        </DragAndDropContext.Provider>
    );
}

export default DragAndDropContext;
