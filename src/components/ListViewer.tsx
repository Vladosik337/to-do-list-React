import React, { useState } from 'react';
import Checkbox from "./Checkbox";

interface TaskInputProps {
    tasks: string[];
    setTasks: (tasks: string[]) => void;
}

const ListViewer: React.FC<TaskInputProps> = ({ tasks, setTasks }) => {
    const [checked, setChecked] = useState<boolean[]>(new Array(tasks.length).fill(false));

    const handleInputChange = (taskIndex: number, newValue: string) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = newValue;
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskIndex: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== taskIndex);
        setTasks(updatedTasks);
        const updatedChecked = checked.filter((_, i) => i !== taskIndex);
        setChecked(updatedChecked);
    };

    const handleCheckboxChange = (taskIndex: number) => {
        const updatedChecked = [...checked];
        updatedChecked[taskIndex] = !updatedChecked[taskIndex];
        setChecked(updatedChecked);
    };

    const taskElements = tasks.map((task, taskIndex) => (
        <div
            key={taskIndex}
            className={`flex items-center justify-between rounded-lg p-4 shadow-md mb-2 w-full max-w-md ${
                checked[taskIndex] ? 'bg-green-800' : 'bg-gray-500'
            }`}
        >
            <label className="flex items-center">
                <Checkbox
                    isChecked={checked[taskIndex]}
                    onChange={() => handleCheckboxChange(taskIndex)}
                />
                <input
                    type="text"
                    id={`task-input-${taskIndex}`}
                    placeholder="Your Task"
                    value={task}
                    onChange={(e) => handleInputChange(taskIndex, e.target.value)}
                    className={`bg-transparent text-white placeholder-gray-400 border-none outline-none ${
                        checked[taskIndex] ? 'line-through' : ''
                    }`}
                />
            </label>
            <button
                className="ml-3 text-sm text-white bg-red-600 py-1 px-3 rounded hover:bg-red-700 transition-colors duration-200"
                onClick={() => handleDeleteTask(taskIndex)}
            >
                Del
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
