import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TaskInputProps {
    title_task: string;
    setTitleTask: (title: string) => void;
    tasks: string[];
    setTasks: (tasks: string[]) => void;
    arrayObjects: { id: string; title: string; isChecked: boolean }[];
    setArrayObjects: (arrayObjects: { id: string; title: string; isChecked: boolean }[]) => void;
}

const ListCreator: React.FC<TaskInputProps> = ({ title_task, setTitleTask, tasks, setTasks, arrayObjects, setArrayObjects }) => {
    const addTasks = () => {
        if (title_task.trim() && title_task.length >= 5) {
            setTasks([...tasks, title_task]);
            setTitleTask('');

            const newTask = {
                id: uuidv4(),
                title: title_task,
                isChecked: false,
            };
            setArrayObjects([...arrayObjects, newTask]);
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
                placeholder="Write your task"
                value={title_task}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg mb-3 w-full"
            />
            <button onClick={addTasks} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                Add Task
            </button>
        </div>
    );
};

export default ListCreator;
