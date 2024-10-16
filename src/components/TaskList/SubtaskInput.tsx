import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (newTaskTitle: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAdd = () => {
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle('');
    }
  };

  return (
    <label className="flex">
      <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Add new task" />
      <button className="ml-[15px]" onClick={handleAdd}>
        Add
      </button>
    </label>
  );
};

export default TaskInput;
