import React, {useEffect} from 'react';
import AddItemInput from './TaskList/AddItemInput.tsx';
import {AppDispatch, RootState} from "../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {createTodo} from "../features/taskListsSlice.ts";

const CreateTaskListTitle: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleAddTask = (title: string) => {
        dispatch(createTodo({title: title}));
    };


    return (
        <AddItemInput
            onAddItem={handleAddTask}
            placeholder={'Add name list'}
            buttonText={'Add'}
        />
    );
};

export default CreateTaskListTitle;
