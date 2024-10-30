import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../redux/store.ts";
import {
    deleteTaskForId,
    getAllTasks,
    toggleTaskCompletionForId,
    updateTaskTitleForId // Додайте це
} from "../../features/taskListsSlice.ts";

const GetTasks = () => {
    const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);
    const dispatch: AppDispatch = useDispatch();

    const [taskCompletion, setTaskCompletion] = useState<{ [key: string]: boolean }>({});
    const [editingTitles, setEditingTitles] = useState<{ [key: string]: string }>({});

    // load tasks
    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    // change state Completion task
    useEffect(() => {
        const initialCompletionState: { [key: string]: boolean } = {};
        taskLists.forEach(task => {
            initialCompletionState[task.id] = task.completed;
        });
        setTaskCompletion(initialCompletionState);
    }, [taskLists]);

    // Initial editing titles state
    useEffect(() => {
        const initialEditingTitles: { [key: string]: string } = {};
        taskLists.forEach(taskId => {
            initialEditingTitles[taskId.id] = taskId.title;
        });
        setEditingTitles(initialEditingTitles);
    }, [taskLists]);

    if (!taskLists || taskLists.length === 0) {
        return <div className="text-center text-gray-600">Loading tasks...</div>;
    }

    const handleToggleTaskCompletion = (taskId: string) => {
        setTaskCompletion(prev => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
        // update DB
        dispatch(toggleTaskCompletionForId({ taskId: taskId, isCompleted: taskCompletion[taskId] }));
    };

    const handleTitleChange = (taskId: string, newTitle: string) => {
        setEditingTitles(prev => ({
            ...prev,
            [taskId]: newTitle
        }));
    };

    const handleTitleBlur = (taskId: string) => {
        const newTitle = editingTitles[taskId];
        if (newTitle) {
            dispatch(updateTaskTitleForId({ taskId, newTitle }));
        }
    };

    const deleteTask = (taskId: string) => {
        dispatch(deleteTaskForId(taskId));
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Task Lists</h2>
            <ul className="space-y-2">
                {taskLists.map((task) => (
                    <li key={task.id}
                        className="flex items-center justify-between p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">
                        <input
                            type="checkbox"
                            checked={taskCompletion[task.id] || false}
                            onChange={() => handleToggleTaskCompletion(task.id)}
                            className="mr-2"
                        />
                        <input
                            type="text"
                            value={editingTitles[task.id] || ""}
                            onChange={(e) => handleTitleChange(task.id, e.target.value)}
                            onBlur={() => handleTitleBlur(task.id)}
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={() => deleteTask(task.id)}>Del</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetTasks;
