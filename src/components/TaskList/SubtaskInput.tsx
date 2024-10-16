import React, { useState } from 'react';

interface SubtaskInputProps {
  onAddSubtask: (newSubtaskTitle: string) => void;
}

const SubtaskInput: React.FC<SubtaskInputProps> = ({ onAddSubtask }) => {
  const [subtaskTitle, setSubtaskTitle] = useState('');

  const handleAddSubtask = () => {
    if (subtaskTitle.trim()) {
      onAddSubtask(subtaskTitle);
      setSubtaskTitle('');
    }
  };

  return (
    <label className="flex">
      <input
        type="text"
        value={subtaskTitle}
        onChange={(e) => setSubtaskTitle(e.target.value)}
        placeholder="Add new subtask"
      />
      <button className="ml-[15px]" onClick={handleAddSubtask}>
        Add
      </button>
    </label>
  );
};

export default SubtaskInput;
