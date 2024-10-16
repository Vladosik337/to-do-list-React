import React, { useState } from 'react';

interface TaskInputProps {
  onAddSubtask: (newSubtaskTitle: string) => void;
  placeholder: string;
  buttonText: string;
}

const SubtaskInput: React.FC<TaskInputProps> = ({ onAddSubtask, placeholder, buttonText }) => {
  const [subtaskTitle, setSubtaskTitle] = useState('');

  const handleAddTask = () => {
    if (subtaskTitle.trim()) {
      onAddSubtask(subtaskTitle);
      setSubtaskTitle('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={subtaskTitle}
        onChange={(e) => setSubtaskTitle(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
      />
      <button
        onClick={handleAddTask}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SubtaskInput;
