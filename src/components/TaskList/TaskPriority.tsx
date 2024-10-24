import React from 'react';
import {AppDispatch, RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {changePriorityTask} from "../../features/taskListsSlice.ts";

interface TaskPriority {
    listId: string;
    taskId: string;
    currentPriority: string;
}

const TaskPriority: React.FC<TaskPriority> = ({listId, taskId, currentPriority}) => {
    const dispatch: AppDispatch = useDispatch();

    const handlePriorityTask = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const valuePriority = e.target.value;
        dispatch(changePriorityTask({listId, taskId, valuePriority}));
    }
    return (
        <div className="relative">
            <select
                name="TaskPriority"
                value={currentPriority}
                onChange={handlePriorityTask}
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path
                        d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
            </div>
        </div>

    );
};

export default TaskPriority;
