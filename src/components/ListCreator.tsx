import React from 'react';

interface TaskInputProps {
    title_task: string;
    setTitleTask: (title: string) => void;
    tasks: string[];
    setTasks: (tasks: string[]) => void;
}

const ListCreator: React.FC<TaskInputProps> = ({ title_task, setTitleTask, tasks, setTasks }) => {
    const addTasks = () => {
        if (title_task.trim() && title_task.length >= 5) {
            setTasks([...tasks, title_task]);
            setTitleTask('');
        } else {
            alert('Ошибка: задание пустое или содержит менее 5 символов');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTask(e.target.value);
    };

    return (
        <div className="flex flex-col items-center mb-4 w-full max-w-md">
            <label htmlFor="task-input" className="flex flex-col w-full">
                <input
                    type="text"
                    id="task-input"
                    placeholder="Write your task"
                    value={title_task}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out mb-3 w-full text-gray-700"
                />
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 shadow-md transition duration-200 ease-in-out"
                    onClick={addTasks}
                >
                    Add Task
                </button>
            </label>
        </div>
    );
};

export default ListCreator;
