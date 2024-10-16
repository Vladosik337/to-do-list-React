import React, { useState } from 'react';
import './styles/style.scss';
import TaskListViewer from './components/TaskList/TaskListViewer';
import CreateTaskListTitle from './components/CreateTaskListTitle';

function App() {
  type TaskListType = {
    id: string;
    title: string;
    isChecked: boolean;
    tasks: { id: string; title: string }[];
  };

  const [taskLists, setTaskLists] = useState<TaskListType[]>([]);

  const addTaskList = (title: string) => {
    const newTaskList = {
      id: `tasklist-${Date.now()}`,
      title: title,
      isChecked: false,
      tasks: [],
    };
    setTaskLists((previousTaskLists) => [...previousTaskLists, newTaskList]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
        <CreateTaskListTitle addTaskList={addTaskList} />
        <TaskListViewer taskLists={taskLists} setTaskLists={setTaskLists} />
      </div>
    </div>
  );
}

export default App;
