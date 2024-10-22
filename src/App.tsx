import React from 'react';
import './styles/style.scss';
import TaskListContainer from './components/TaskList/TaskListContainer';
import AddItemInput from './components/TaskList/AddItemInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { addTaskList, addTaskToList, editTaskName, removeTaskFromList, removeTaskList, updateTaskTitle, toggleTaskCompletion } from './features/taskListsSlice.ts';
import { v4 as uuidv4 } from 'uuid';
import {list} from "postcss";

function App() {
    const dispatch: AppDispatch = useDispatch(); // Використовуємо useDispatch для виклику дій Redux
    const taskLists = useSelector((state: RootState) => state.taskLists.taskLists); // Отримуємо списки завдань зі стану Redux за допомогою useSelector


    // Функція для додавання нового списку завдань
    const handleAddTaskList = (title: string) => {
        dispatch(addTaskList({ isCompleted: false, id: `tasklist-${uuidv4()}`, title, tasks: [] }));
    };

  // Функция для добавления задачи в определенный список задач
    const handleAddTaskToList = (listId: string, taskTitle: string) => {
        dispatch(addTaskToList( { listId, taskTitle}));
    }

  // Функция для изменения названия задачи
    const handleEditTaskListTitle = (listId: string, taskId: string, newTitle: string) => {
        dispatch(editTaskName({ listId, taskId, newTitle, })); // Ви можете реалізувати цю логіку у вашому слайсі
    };

  // Функция для изменения названия списка
    const handleUpdateTaskTitle = (listId: string, newTitle: string) => {
        dispatch(updateTaskTitle({listId, newTitle}))
    };

  // Функция для удаления задачи из списка
    const handleRemoveTaskFromList = (listId: string, taskId: string) => {
        dispatch(removeTaskFromList({listId, taskId}))
    };

  // Функция для удаления списка задач
    const handleRemoveTaskList = (listId: string) => {
        dispatch(removeTaskList({listId}))
    };

  // Функция для переключения состояния выполнения задачи\
    const handleToggleTaskCompletion = (listId: string, taskId: string) => {
        dispatch(toggleTaskCompletion({listId, taskId}))
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
      <div className="w-full max-w-[965px] bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
        <AddItemInput onAddItem={handleAddTaskList} placeholder="Add Task List" buttonText="Add" />
        <TaskListContainer
          taskLists={taskLists}
          addTask={handleAddTaskToList}
          deleteTask={handleRemoveTaskFromList}
          deleteTaskList={handleRemoveTaskList}
          toggleTaskCompletion={handleToggleTaskCompletion}
          editTaskName={handleEditTaskListTitle}
          updateTaskTitle={handleUpdateTaskTitle}
        />
      </div>
    </div>
  );
}

export default App;
