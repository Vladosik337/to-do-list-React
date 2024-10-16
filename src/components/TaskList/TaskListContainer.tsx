import React from 'react';
import AddItemInput from './AddItemInput';
import TaskItem from './TaskItem';

interface TaskListContainerProps {
  taskLists: {
    id: string;
    title: string;
    isCompleted: boolean;
    tasks: { id: string; title: string; isCompleted: boolean }[];
  }[];
  addTask: (listId: string, taskTitle: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  toggleTaskCompletion: (listId: string, taskId: string) => void;
  updateTaskTitle: (listId: string, taskId: string, newTitle: string) => void;
}

const TaskListContainer: React.FC<TaskListContainerProps> = ({
  taskLists,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  updateTaskTitle,
}) => (
  <div className="flex flex-row items-center justify-center mt-4 gap-5 flex-wrap">
    {taskLists.map((taskList) => (
      <div
        key={taskList.id}
        className="flex flex-col items-center justify-between p-4 w-full max-w-md mb-2 bg-gray-300 rounded-lg"
      >
        <label className="text-xl font-semibold mb-4">{taskList.title}</label>
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
              onUpdateTitle={(newTitle) => updateTaskTitle(taskList.id, task.id, newTitle)}
            />
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default TaskListContainer;
