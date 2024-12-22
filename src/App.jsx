import Lists from "./components/Lists.jsx";
import { DragAndDropContextProvider } from "./context/DragAndDropContext.jsx";

const App = () => {
    return (
        <DragAndDropContextProvider>
            <Lists />
        </DragAndDropContextProvider>
    );
};

export default App;
