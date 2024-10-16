import React from 'react';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';

interface TaskViewerProps {
  arrayObjects: {
    id: string;
    title: string;
    isChecked: boolean;
    tasks: { id: string; title: string; isChecked: boolean }[];
  }[];
  setArrayObjects: (
    arrayObjects: {
      id: string;
      title: string;
      isChecked: boolean;
      tasks: { id: string; title: string; isChecked: boolean }[];
    }[],
  ) => void;
}

const ListViewer: React.FC<TaskViewerProps> = ({ arrayObjects, setArrayObjects }) => {
  const handleCheckboxChange = (taskId: string, subtaskId: string) => {
    const updatedTasks = arrayObjects.map((task) =>
      task.id === taskId
        ? {
            ...task,
            tasks: task.tasks.map((subtask) =>
              subtask.id === subtaskId ? { ...subtask, isChecked: !subtask.isChecked } : subtask,
            ),
          }
        : task,
    );
    setArrayObjects(updatedTasks);
  };

  const handleDeleteTask = (taskId: string, subtaskId: string) => {
    const updatedTasks = arrayObjects.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          tasks: task.tasks.filter((subtask) => subtask.id !== subtaskId),
        };
      }
      return task;
    });
    setArrayObjects(updatedTasks);
  };

  const handleTaskTitleChange = (taskId: string, subtaskId: string, newTitle: string) => {
    const updatedTasks = arrayObjects.map((task) =>
      task.id === taskId
        ? {
            ...task,
            tasks: task.tasks.map((subtask) => (subtask.id === subtaskId ? { ...subtask, title: newTitle } : subtask)),
          }
        : task,
    );
    setArrayObjects(updatedTasks);
  };

  const handleAddSubtask = (taskId: string, subtaskTitle: string) => {
    const updatedTasks = arrayObjects.map((task) => {
      if (task.id === taskId) {
        const newSubtask = { id: `subtask-${Date.now()}`, title: subtaskTitle, isChecked: false };
        return { ...task, tasks: [...task.tasks, newSubtask] };
      }
      return task;
    });
    setArrayObjects(updatedTasks);
  };
  // console.log(arrayObjects);
  return (
    <div className="flex flex-col items-center mt-[15px]">
      {arrayObjects.map((task) => (
        <div key={task.id} className="flex flex-col items-center justify-between p-4 w-full max-w-md mb-2 bg-gray-300">
          <label className="flex items-center mb-[15px]">{task.title}</label>

          <TaskInput onAddTask={(newTaskTitle) => handleAddSubtask(task.id, newTaskTitle)} />

          <ul className="mt-2 flex flex-col w-full gap-[10px]">
            {task.tasks.map((subtask) => (
              <TaskItem
                key={subtask.id}
                id={subtask.id}
                title={subtask.title}
                isChecked={subtask.isChecked}
                onCheckboxChange={() => handleCheckboxChange(task.id, subtask.id)}
                onDeleteTask={() => handleDeleteTask(task.id, subtask.id)}
                onTaskTitleChange={(newTitle) => handleTaskTitleChange(task.id, subtask.id, newTitle)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListViewer;
