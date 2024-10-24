import React from 'react';
import {AppDispatch} from "../../redux/store.ts";
import {useDispatch} from "react-redux";
import {filterTaskPriority} from "../../features/taskListsSlice.ts";

interface FilterPriorityProps {
    listId: string;
    onFilterChange: (priority: string) => void;
}

const FilterPriority: React.FC<FilterPriorityProps> = ({listId, onFilterChange}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleFilterChange = (priority: string) => {
        onFilterChange(priority);
        dispatch(filterTaskPriority({listId, valuePriority: priority}));
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="flex space-x-4">
                <button
                    onClick={() => handleFilterChange('high')}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
                >
                    High
                </button>
                <button
                    onClick={() => handleFilterChange('medium')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
                >
                    Medium
                </button>
                <button
                    onClick={() => handleFilterChange('low')}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
                >
                    Low
                </button>
                <button
                    onClick={() => handleFilterChange('All')}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out"
                >
                    All
                </button>
            </div>
        </div>
    );
};

export default FilterPriority;
