import React, { useState } from 'react';

interface CreateTaskListTitleProps {
  addTaskList: (title: string) => void;
}

const CreateTaskListTitle: React.FC<CreateTaskListTitleProps> = ({ addTaskList }) => {
  const [taskListTitle, setTaskListTitle] = useState('');

  const handleAddTaskList = () => {
    if (taskListTitle.trim() && taskListTitle.length >= 5) {
      addTaskList(taskListTitle);
      setTaskListTitle('');
    } else {
      alert('Ошибка: задание пустое или содержит менее 5 символов');
    }
  };

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskListTitle(e.target.value);
  };

  return (
    <div className="flex flex-col items-center mb-4 w-full">
      <input
        type="text"
        placeholder="Write the name of the list"
        value={taskListTitle}
        onChange={handleTitleInputChange}
        className="p-2 border border-gray-300 rounded-lg mb-3 max-w-w-[300px]"
      />
      <button onClick={handleAddTaskList} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Add Task List
      </button>
    </div>
  );
};

export default CreateTaskListTitle;
