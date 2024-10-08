import {useState} from 'react';
import './styles/style.scss';
import ListCreator from "./components/ListCreator.tsx";
import ListViewer from "./components/ListViewer.tsx";

function App() {
    return (
        <div className="min-h-full flex flex-col items-center justify-center overflow-clip h-screen">
            <ListCreator/>
            <div className={'view-lists'}>
                <ListViewer/>
            </div>
        </div>
    );
}

export default App;
