import React from 'react';
import {AppDispatch} from "../../redux/store.ts";
import {useDispatch} from "react-redux";
import {filterTaskPriority} from "../../features/taskListsSlice.ts";

interface FilterPriorityProps {
    listId: string;
    taskIds: string[]; // Змінено на taskIds
}

const FilterPriority: React.FC<FilterPriorityProps> = ({listId, taskIds}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleFilterChange = (valuePriority: string) => {
        if (taskIds && taskIds.length > 0) {
            dispatch(filterTaskPriority({listId, taskIds, valuePriority}));
        }
    };

    return (
        <div className={'flex space-x-4'}>
            <button onClick={() => handleFilterChange('high')}>High</button>
            <button onClick={() => handleFilterChange('medium')}>Medium</button>
            <button onClick={() => handleFilterChange('low')}>Low</button>
            <button onClick={() => handleFilterChange('All')}>All</button>
        </div>
    );
};

export default FilterPriority;
