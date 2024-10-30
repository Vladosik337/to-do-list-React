import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store.ts";
import {deleteTaskForId, getAllTasks, toggleTaskCompletion, updateTaskTitle} from "../../features/taskListsSlice.ts";

const GetTasks = () => {
    const taskLists = useSelector((state: RootState) => state.taskLists.taskLists);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!taskLists || taskLists.length === 0) {
        return <div className="text-center text-gray-600">Loading tasks...</div>;
    }

    const handleToggleTaskCompletion = (listId: string) => {
        dispatch(toggleTaskCompletion(listId));
    };

    const handleTitleChange = (listId: string, newTitle: string) => {
        dispatch(updateTaskTitle({listId, title: newTitle}));
    };

    const deleteTask = (listId: string) => {
        dispatch(deleteTaskForId(listId));
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Task Lists</h2>
            <ul className="space-y-2">
                {taskLists.map((list) => (
                    <li key={list.id}
                        className="flex items-center justify-between p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">
                        <input
                            type="checkbox"
                            checked={list.completed}
                            onChange={() => handleToggleTaskCompletion(list.id)}
                            className="mr-2"
                        />
                        <input
                            type="text"
                            value={list.title}
                            onChange={(e) => handleTitleChange(list.id, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={()=> deleteTask(list.id)}>Del</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetTasks;
