import React from 'react';
import SubtaskInput from './SubtaskInput';
import SubtaskItem from './SubtaskItem';

interface TaskListViewerProps {
  taskLists: {
    id: string;
    title: string;
    isChecked: boolean;
    tasks: { id: string; title: string; isChecked: boolean }[];
  }[];
  setTaskLists: (
    taskLists: {
      id: string;
      title: string;
      isChecked: boolean;
      tasks: { id: string; title: string; isChecked: boolean }[];
    }[],
  ) => void;
}

const TaskListViewer: React.FC<TaskListViewerProps> = ({ taskLists, setTaskLists }) => {
  const toggleSubtaskCompletion = (taskId: string, subtaskId: string) => {
    const updatedTaskLists = taskLists.map((taskList) =>
      taskList.id === taskId
        ? {
            ...taskList,
            tasks: taskList.tasks.map((subtask) =>
              subtask.id === subtaskId ? { ...subtask, isChecked: !subtask.isChecked } : subtask,
            ),
          }
        : taskList,
    );
    setTaskLists(updatedTaskLists);
  };
  const deleteSubtask = (taskId: string, subtaskId: string) => {
    const updatedTaskLists = taskLists.map((taskList) => {
      if (taskList.id === taskId) {
        return {
          ...taskList,
          tasks: taskList.tasks.filter((subtask) => subtask.id !== subtaskId),
        };
      }
      return taskList;
    });
    setTaskLists(updatedTaskLists);
  };

  const updateSubtaskTitle = (taskId: string, subtaskId: string, newTitle: string) => {
    const updatedTaskLists = taskLists.map((taskList) =>
      taskList.id === taskId
        ? {
            ...taskList,
            tasks: taskList.tasks.map((subtask) =>
              subtask.id === subtaskId ? { ...subtask, title: newTitle } : subtask,
            ),
          }
        : taskList,
    );
    setTaskLists(updatedTaskLists);
  };

  const addSubtask = (taskId: string, subtaskTitle: string) => {
    const updatedTaskLists = taskLists.map((taskList) => {
      if (taskList.id === taskId) {
        const newSubtask = { id: `subtask-${Date.now()}`, title: subtaskTitle, isChecked: false };
        return { ...taskList, tasks: [...taskList.tasks, newSubtask] };
      }
      return taskList;
    });
    setTaskLists(updatedTaskLists);
  };

  return (
    <div className="flex flex-col items-center mt-[15px]">
      {taskLists.map((taskList) => (
        <div
          key={taskList.id}
          className="flex flex-col items-center justify-between p-4 w-full max-w-md mb-2 bg-gray-300"
        >
          <label className="flex items-center mb-[15px]">{taskList.title}</label>

          <SubtaskInput onAddSubtask={(newTaskTitle) => addSubtask(taskList.id, newTaskTitle)} />

          <ul className="mt-2 flex flex-col w-full gap-[10px]">
            {taskList.tasks.map((subtask) => (
              <SubtaskItem
                key={subtask.id}
                id={subtask.id}
                title={subtask.title}
                isChecked={subtask.isChecked}
                onToggleComplete={() => toggleSubtaskCompletion(taskList.id, subtask.id)}
                onDeleteSubtask={() => deleteSubtask(taskList.id, subtask.id)}
                onUpdateSubtaskTitle={(newTitle) => updateSubtaskTitle(taskList.id, subtask.id, newTitle)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskListViewer;
