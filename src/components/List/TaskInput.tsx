import React from 'react';

interface TaskInputProps {
    taskTitle: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ taskTitle, onInputChange, onAddTask }) => {
    return (
        <label className="flex">
            <input type="text" value={taskTitle} onChange={onInputChange} />
            <button className="ml-[15px]" onClick={onAddTask}>Add</button>
        </label>
    );
};

export default TaskInput;
