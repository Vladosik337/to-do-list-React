import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // імпорт бібліотеки для генерації унікальних ID

interface CreateNoteTitelProps {
    addNewNote: (title: string) => void; // Передача функції для додавання нової нотатки
}

const CreateNoteTitel: React.FC<CreateNoteTitelProps> = ({ addNewNote }) => {
    const [titleTask, setTitleTask] = useState('');

    const handleAddNote = () => {
        if (titleTask.trim() && titleTask.length >= 5) {
            addNewNote(titleTask); // Виклик функції для додавання нотатки
            setTitleTask(''); // Очищення поля вводу
        } else {
            alert('Ошибка: задание пустое или содержит менее 5 символов');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTask(e.target.value);
    };

    return (
        <div className="flex flex-col items-center mb-4 w-full max-w-md">
            <input
                type="text"
                placeholder="Write the name of the list"
                value={titleTask}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg mb-3 w-full"
            />
            <button onClick={handleAddNote} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Add Note
            </button>
        </div>
    );
};

export default CreateNoteTitel;
