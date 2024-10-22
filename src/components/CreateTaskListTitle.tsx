import React from 'react';
import AddItemInput from './TaskList/AddItemInput.tsx';
import {AppDispatch, RootState} from "../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {addTaskList} from "../features/taskListsSlice.ts";

const CreateTaskListTitle: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddTaskList = (title: string) => {
    dispatch(addTaskList({ isCompleted: false, id: `tasklist-${uuidv4()}`, title, tasks: [] }));
  };

  return (
      <AddItemInput
          onAddItem={handleAddTaskList}
          placeholder={'Add name list'}
          buttonText={'Add'}
      />
  );
};

export default CreateTaskListTitle;
