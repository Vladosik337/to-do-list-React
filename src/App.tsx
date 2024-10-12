import React, { useState } from 'react';
import './styles/style.scss';
import ListCreator from "./components/ListCreator";
import ListViewer from "./components/ListViewer";

function App() {
    const [arrayObjects, setArrayObjects] = useState<{ id: string; title: string; isChecked: boolean }[]>([]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
                <ListCreator
                    arrayObjects={arrayObjects}
                    setArrayObjects={setArrayObjects}
                />
                <ListViewer
                    arrayObjects={arrayObjects}
                    setArrayObjects={setArrayObjects}
                />
            </div>
        </div>
    );
}

export default App;
