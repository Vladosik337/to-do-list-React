import React from 'react';

interface TaskItemProps {
  id: string;
  title: string;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onDeleteTask: () => void;
  onTaskTitleChange: (newTitle: string) => void;
}

const SubtaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  isChecked,
  onCheckboxChange,
  onDeleteTask,
  onTaskTitleChange,
}) => {
  return (
    <li
      className={`flex items-center justify-between p-4 w-full max-w-md mb-2 ${isChecked ? 'bg-green-800' : 'bg-gray-500'}`}
    >
      <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} />
      <input
        type="text"
        placeholder="Your task"
        value={title}
        onChange={(e) => onTaskTitleChange(e.target.value)}
        className={`ml-2 bg-transparent text-white placeholder-gray-400 border-none outline-none ${isChecked ? 'line-through' : ''}`}
      />
      <button
        className="ml-3 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors duration-200"
        onClick={onDeleteTask}
      >
        Del
      </button>
    </li>
  );
};

export default SubtaskItem;
