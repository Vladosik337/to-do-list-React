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
    toggleTaskCompletion, updateTaskTitle
} from "../../features/taskListsSlice.ts";


const TaskListContainer: React.FC = () => {
    const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);
    const dispatch: AppDispatch = useDispatch(); // Використовуємо useDispatch для виклику дій Redux

    // Функция для добавления задачи в определенный список задач
    const handleAddTaskToList = (listId: string, taskTitle: string) => {
        dispatch(addTaskToList({listId, taskTitle}));
    }

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

    // Функция для изменения названия задачи
    const handleEditTaskListTitle = (listId: string, taskId: string, newTitle: string) => {
        dispatch(editTaskName({listId, taskId, newTitle,})); // Ви можете реалізувати цю логіку у вашому слайсі
    };

    // Функция для изменения названия списка
    const handleUpdateTaskTitle = (listId: string, newTitle: string) => {
        dispatch(updateTaskTitle({listId, newTitle}))
    };

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
                                handleUpdateTaskTitle(taskList.id, e.target.value);
                            }}
                            className="w-full p-2 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Title task list"
                        />
                        <button
                            onClick={() => handleRemoveTaskList(taskList.id)}
                            className="ml-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors duration-200"
                        >
                            Delete List
                        </button>
                    </div>
                    <AddItemInput onAddItem={(title) => handleAddTaskToList(taskList.id, title)} placeholder="Add Task"
                                  buttonText="Add"/>
                    <ul className="mt-2 w-full space-y-2">
                        {taskList.tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                id={task.id}
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
