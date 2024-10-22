import React from 'react';
import './styles/style.scss';
import TaskListContainer from './components/TaskList/TaskListContainer';
import AddItemInput from './components/TaskList/AddItemInput';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { addTaskList } from './features/taskListsSlice.ts';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);

  // Инициализация состояния с одним списком задач и одной задачей
  // const [taskLists, setTaskLists] = useState<TaskList[]>([
  //   {
  //     id: `tasklist-${uuidv4()}`,
  //     title: 'My First Task List',
  //     isCompleted: false,
  //     tasks: [
  //       {
  //         id: `task-${uuidv4()}`,
  //         title: 'Sample Task 1',
  //         isCompleted: false,
  //       },
  //       {
  //         id: `task-${uuidv4()}`,
  //         title: 'Sample Task 2',
  //         isCompleted: true,
  //       },
  //     ],
  //   },
  // ]);
  const handleAddTaskList = (title: string) => {
    dispatch(addTaskList({ isCompleted: false, id: `tasklist-${uuidv4()}`, title, tasks: [] }));
  };

  // Функция для добавления нового списка задач
  // const addTaskList = (listTitle: string) => {
  //   const newTaskList: TaskList = {
  //     id: `tasklist-${uuidv4()}`,
  //     title: listTitle,
  //     isCompleted: false,
  //     tasks: [],
  //   };
  //   setTaskLists([newTaskList, ...taskLists]);
  // };

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
  const editTaskName = (listId: string, taskId: string, newTitle: string) => {
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

  // Функция для изменения названия списка
  const updateTaskTitle = (listId: string, newTitle: string) => {
    setTaskLists((prevTaskLists) =>
      prevTaskLists.map((taskList) => (taskList.id === listId ? { ...taskList, title: newTitle } : taskList)),
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

  // Функция для удаления списка задач
  const removeTaskList = (listId: string) => {
    setTaskLists(taskLists.filter((taskList) => taskList.id !== listId));
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
        <AddItemInput onAddItem={handleAddTaskList} placeholder="Add Task List" buttonText="Add" />
        <TaskListContainer
          taskLists={taskLists}
          addTask={addTaskToList}
          deleteTask={removeTaskFromList}
          deleteTaskList={removeTaskList}
          toggleTaskCompletion={toggleTaskCompletion}
          editTaskName={editTaskName}
          updateTaskTitle={updateTaskTitle}
        />
      </div>
    </div>
  );
}

export default App;
