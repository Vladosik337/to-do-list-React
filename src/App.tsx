import React from 'react';
import './styles/style.scss';
import TaskListContainer from './components/TaskList/TaskListContainer';
import AddItemInput from './components/TaskList/AddItemInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { addTaskList } from './features/taskListsSlice.ts';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const dispatch: AppDispatch = useDispatch();
    const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);


    // Функція для додавання нового списку завдань
    const handleAddTaskList = (title: string) => {
        dispatch(addTaskList({ isCompleted: false, id: `tasklist-${uuidv4()}`, title, tasks: [] }));
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
      <div className="w-full max-w-[965px] bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
        <AddItemInput onAddItem={handleAddTaskList} placeholder="Add Task List" buttonText="Add" />
        <TaskListContainer taskLists={taskLists}/>
      </div>
    </div>
  );
}

export default App;
