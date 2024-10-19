import React from 'react';
import AddItemInput from './AddItemInput.tsx';
import TaskItem from './TaskItem.tsx';

interface TaskListContainerProps {
  taskLists: {
    id: string;
    title: string;
    isCompleted: boolean;
    tasks: { id: string; title: string; isCompleted: boolean }[];
  }[];
  addTask: (listId: string, taskTitle: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  deleteTaskList: (listId: string) => void;
  toggleTaskCompletion: (listId: string, taskId: string) => void;
  editTaskName: (listId: string, taskId: string, newTitle: string) => void;
  updateTaskTitle: (listId: string, newTitle: string) => void;
}

const TaskListContainer: React.FC<TaskListContainerProps> = ({
  taskLists,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  editTaskName,
  updateTaskTitle,
  deleteTaskList,
}) => {
  return (
    <div className="flex flex-row items-center justify-center mt-4 gap-5 flex-wrap">
      {taskLists.map((taskList) => (
        <div
          key={taskList.id}
          className="flex flex-col items-center justify-between p-4 w-full max-w-md mb-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        >
          <div className="flex w-full">
            <input
              type="text"
              value={taskList.title}
              onChange={(e) => {
                updateTaskTitle(taskList.id, e.target.value);
              }}
              className="w-full p-2 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Title task list"
            />
            <button
              onClick={() => deleteTaskList(taskList.id)}
              className="ml-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors duration-200"
            >
              Delete List
            </button>
          </div>
          <AddItemInput onAddItem={(title) => addTask(taskList.id, title)} placeholder="Add Task" buttonText="Add" />
          <ul className="mt-2 w-full space-y-2">
            {taskList.tasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                isCompleted={task.isCompleted}
                onToggleCompletion={() => toggleTaskCompletion(taskList.id, task.id)}
                onDelete={() => deleteTask(taskList.id, task.id)}
                onUpdateTitle={(newTitle) => editTaskName(taskList.id, task.id, newTitle)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskListContainer;
