import React from 'react';

interface TaskInputProps {
    tasks: string[];
    setTasks: (tasks: string) => void;
}

const ListViewer: React.FC<TaskInputProps> = ({ tasks, setTasks }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTasks(e.target.value);
    };

    const taskElements = tasks.map((task, index) => (
        <div
            key={index}
            className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow-md mb-2 w-full max-w-md"
        >
            <label className="flex items-center">
                <input
                    type="checkbox"
                    className="mr-3 h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                <input
                    type="text"
                    id={`task-input-${index}`}
                    placeholder="Ваше завдання"
                    value={task}
                    onChange={handleInputChange}
                    className="bg-gray-800 text-white placeholder-gray-400 border-none outline-none"
                />
            </label>
            <button
                className="ml-3 text-sm text-white bg-red-600 py-1 px-3 rounded hover:bg-red-700 transition-colors duration-200"
            >
                Видалити
            </button>
        </div>
    ));

    return (
        <div className="flex flex-col items-center">
            {taskElements}
        </div>
    );
};

export default ListViewer;
