import React from 'react';

interface TaskViewerProps {
    arrayObjects: {
        id: string;
        title: string;
        isChecked: boolean }[];
    setArrayObjects: (arrayObjects: { id: string; title: string; isChecked: boolean }[]) => void;
}

const ListViewer: React.FC<TaskViewerProps> = ({ arrayObjects, setArrayObjects }) => {
    const handleCheckboxChange = (id: string) => {
        const updatedTasks = arrayObjects.map(task =>
            task.id === id ? { ...task, isChecked: !task.isChecked } : task
        );
        setArrayObjects(updatedTasks);
    };

    const handleDeleteTask = (id: string) => {
        const updatedTasks = arrayObjects.filter(task => task.id !== id);
        setArrayObjects(updatedTasks);
    };

    const handleTaskTitleChange = (id: string, newTitle: string) => {
        const updatedTasks = arrayObjects.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        );
        setArrayObjects(updatedTasks);
    };

    return (
        <div className="flex flex-col items-center">
            {arrayObjects.map(task => (
                <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 w-full max-w-md mb-2 ${
                        task.isChecked ? 'bg-green-800' : 'bg-gray-500'
                    }`}
                >
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={task.isChecked}
                            onChange={() => handleCheckboxChange(task.id)}
                        />
                        <input
                            type="text"
                            placeholder={"Your task"}
                            value={task.title}
                            onChange={(e) => handleTaskTitleChange(task.id, e.target.value)}
                            className={`ml-2 bg-transparent text-white placeholder-gray-400 border-none outline-none ${
                                task.isChecked ? 'line-through' : ''
                            }`}
                        />
                    </label>
                    <button
                        className="ml-3 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors duration-200"
                        onClick={() => handleDeleteTask(task.id)}
                    >
                        Del
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ListViewer;
