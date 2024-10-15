import React, { useState } from 'react';
import './styles/style.scss';
import ListViewer from "./components/List/ListViewer";
import CreateNoteTitel from "./components/CreateNoteTitel"; // Переконайся, що імпорт правильний

function App() {
    const [arrayObjects, setArrayObjects] = useState<{
        id: string;
        title: string;
        isChecked: boolean;
        tasks: { id: string; title: string }[];
    }[]>([]);

    const addNewNote = (title: string) => {
        const newNote = {
            id: `note-${Date.now()}`,
            title: title,
            isChecked: false,
            tasks: []
        };
        setArrayObjects(prevArray => [...prevArray, newNote]);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
                <CreateNoteTitel addNewNote={addNewNote} />
                <ListViewer
                    arrayObjects={arrayObjects}
                    setArrayObjects={setArrayObjects}
                />
            </div>
        </div>
    );
}

export default App;
