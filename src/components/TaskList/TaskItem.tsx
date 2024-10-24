import React from 'react';
import TaskPriority from "./TaskPriority.tsx";

interface TaskItemProps {
    listId: string;
    taskId: string;
    title: string;
    isCompleted: boolean;
    currentPriority: string
    onToggleCompletion: () => void;
    onDelete: () => void;
    onUpdateTitle: (newTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
                                               taskId,
                                               listId,
                                               title,
                                               isCompleted,
                                               currentPriority,
                                               onToggleCompletion,
                                               onDelete,
                                               onUpdateTitle
                                           }) => {

    return (
        <li className={`flex items-center justify-between p-4 ${isCompleted ? 'bg-green-800' : 'bg-gray-500'} rounded-md`}>
            <input type="checkbox" checked={isCompleted} onChange={onToggleCompletion}/>
            <input
                type="text"
                value={title}
                onChange={(e) => onUpdateTitle(e.target.value)}
                className={`ml-2 bg-transparent text-white border-none outline-none ${isCompleted ? 'line-through' : ''}`}
            />
            <TaskPriority listId={listId} taskId={taskId} currentPriority={currentPriority}/>
            <button
                onClick={onDelete}
                className="ml-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors duration-200"
            >
                Delete
            </button>
        </li>)
}

export default TaskItem;
