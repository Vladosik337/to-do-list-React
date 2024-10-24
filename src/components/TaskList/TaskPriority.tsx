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
        <div>
            <select name="TaskPriority" value={currentPriority} onChange={handlePriorityTask}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                {/* Додаємо варіант "ЛОВ" */}
            </select>
        </div>
    );
};

export default TaskPriority;
