import React, { useState } from 'react';
import './styles/style.scss';
import TaskListContainer from './components/TaskList/TaskListContainer';
import AddItemInput from './components/TaskList/AddItemInput';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Определение типов данных для задач и списков задач
  type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
  };

  type TaskList = {
    id: string;
    title: string;
    isCompleted: boolean;
    tasks: Task[];
  };

  // Использование состояния для хранения списка задач
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);

  // Функция для добавления нового списка задач
  const addTaskList = (listTitle: string) => {
    const newTaskList: TaskList = {
      id: `tasklist-${uuidv4()}`,
      title: listTitle,
      isCompleted: false,
      tasks: [],
    };
    setTaskLists([newTaskList, ...taskLists]);
    console.log(taskLists);
  };

  // Функция для добавления задачи в определенный список задач
  const addTaskToList = (listId: string, taskTitle: string) => {
    setTaskLists(
      taskLists.map((taskList) =>
        taskList.id === listId
          ? {
              ...taskList,
              tasks: [{ id: `task-${uuidv4()}`, title: taskTitle, isCompleted: false }, ...taskList.tasks],
            }
          : taskList,
      ),
    );
  };

  // Функция для изменения названия задачи
  const editTaskTitle = (listId: string, taskId: string, newTitle: string) => {
    setTaskLists(
      taskLists.map((taskList) =>
        taskList.id === listId
          ? {
              ...taskList,
              tasks: taskList.tasks.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task)),
            }
          : taskList,
      ),
    );
  };

  // Функция для удаления задачи из списка
  const removeTaskFromList = (listId: string, taskId: string) => {
    setTaskLists(
      taskLists.map((taskList) =>
        taskList.id === listId ? { ...taskList, tasks: taskList.tasks.filter((task) => task.id !== taskId) } : taskList,
      ),
    );
  };

  // Функция для переключения состояния выполнения задачи
  const toggleTaskCompletion = (listId: string, taskId: string) => {
    setTaskLists(
      taskLists.map((taskList) =>
        taskList.id === listId
          ? {
              ...taskList,
              tasks: taskList.tasks.map((task) =>
                task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
              ),
            }
          : taskList,
      ),
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
      <div className="w-full max-w-[965px] bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
        <AddItemInput onAddItem={addTaskList} placeholder="Add Task List" buttonText="Add" />
        <TaskListContainer
          taskLists={taskLists}
          addTask={addTaskToList}
          deleteTask={removeTaskFromList}
          toggleTaskCompletion={toggleTaskCompletion}
          updateTaskTitle={editTaskTitle}
        />
      </div>
    </div>
  );
}

export default App;
