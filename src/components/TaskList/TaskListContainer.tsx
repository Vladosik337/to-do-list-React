// TaskListContainer.tsx
import React from 'react';
import AddItemInput from './AddItemInput.tsx';
import TaskItem from './TaskItem.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store.ts";
import {
    addTaskToList,
    editTaskName,
    removeTaskFromList,
    removeTaskList,
    toggleTaskCompletion,
    updateTaskTitle
} from "../../features/taskListsSlice.ts";
import FilterPriority from "./FilterPriority.tsx";

const TaskListContainer: React.FC = () => {
    const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);
    const dispatch: AppDispatch = useDispatch();

    const handleAddTaskToList = (listId: string, taskTitle: string) => {
        dispatch(addTaskToList({listId, taskTitle}));
    };

    const handleRemoveTaskFromList = (listId: string, taskId: string) => {
        dispatch(removeTaskFromList({listId, taskId}));
    };

    const handleRemoveTaskList = (listId: string) => {
        dispatch(removeTaskList({listId}));
    };

    const handleToggleTaskCompletion = (listId: string, taskId: string) => {
        dispatch(toggleTaskCompletion({listId, taskId}));
    };

    const handleEditTaskListTitle = (listId: string, taskId: string, newTitle: string) => {
        dispatch(editTaskName({listId, taskId, newTitle}));
    };

    const handleUpdateTaskTitle = (listId: string, newTitle: string) => {
        dispatch(updateTaskTitle({listId, newTitle}));
    };

    return (
        <div className="flex flex-row items-center justify-center mt-4 gap-5 flex-wrap">
            {taskLists.map((taskList) => (
                <div key={taskList.id} className="...">

                    <AddItemInput onAddItem={(title) => handleAddTaskToList(taskList.id, title)} placeholder="Add Task"
                                  buttonText="Add"/>
                    <FilterPriority listId={taskList.id} taskIds={taskList.tasks.map((task) => task.id)}/>


                    <ul className="mt-2 w-full space-y-2">
                        {taskList.tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                listId={taskList.id}
                                taskId={task.id}
                                currentPriority={task.priority}
                                title={task.title}
                                isCompleted={task.isCompleted}
                                onToggleCompletion={() => handleToggleTaskCompletion(taskList.id, task.id)}
                                onDelete={() => handleRemoveTaskFromList(taskList.id, task.id)}
                                onUpdateTitle={(newTitle) => handleEditTaskListTitle(taskList.id, task.id, newTitle)}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TaskListContainer;
