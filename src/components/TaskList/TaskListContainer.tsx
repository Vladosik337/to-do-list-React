import React, {useEffect, useState} from 'react';
import AddItemInput from './AddItemInput.tsx';
import TaskItem from './TaskItem.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store.ts";
import {
    addTaskToList,
    editTaskName, getAllTasks,
    removeTaskFromList,
    removeTaskList,
    toggleTaskCompletion,
    updateTaskTitle,
} from "../../features/taskListsSlice.ts";
import FilterPriority from "./FilterPriority.tsx";

const TaskListContainer: React.FC = () => {
    const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);
    const dispatch: AppDispatch = useDispatch();
    const [filteredTasks, setFilteredTasks] = useState<{ [key: string]: any[] }>({});

    // Функція для фільтрації завдань на рівні TaskListContainer
    const handleFilterTasks = (listId: string, priority: string) => {
        const taskList = taskLists.find(list => list.id === listId);

        if (taskList) {
            const filtered = priority === 'All'
                ? taskList.tasks // Якщо обрано "All", повертаємо всі завдання
                : taskList.tasks.filter(task => task.priority === priority); // Фільтруємо за пріоритетом
            setFilteredTasks(prev => ({...prev, [listId]: filtered}));
        }
    };

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
                <div key={taskList.id}>
                    <div className={'flex'}>
                        <input
                            type="text"
                            value={taskList.title}
                            onChange={(e) => handleUpdateTaskTitle(taskList.id, e.target.value)}
                            className="w-full p-2 mb-4 text-lg border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={'Title task list'}
                        />
                        <button
                            onClick={() => handleRemoveTaskList(taskList.id)}
                            className="ml-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors duration-200"
                        >
                            Delete
                        </button>
                    </div>
                    <AddItemInput onAddItem={(title) => handleAddTaskToList(taskList.id, title)} placeholder="Add Task"
                                  buttonText="Add"/>
                    <FilterPriority
                        listId={taskList.id}
                        taskIds={taskList.tasks.map((task) => task.id)}
                        onFilterChange={(priority) => handleFilterTasks(taskList.id, priority)}
                    />

                    <ul className="mt-2 w-full space-y-2">
                        {(
                            filteredTasks[taskList.id] || taskList.tasks // Якщо є фільтровані завдання, показуємо їх, інакше — всі завдання
                        ).map((task) => (
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
