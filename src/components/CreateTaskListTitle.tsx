import React from 'react';
import InputWithButtonProps from './TaskList/AddItemInput.tsx';

interface CreateTaskListTitleProps {
  addTaskList: (title: string) => void;
}

const CreateTaskListTitle: React.FC<CreateTaskListTitleProps> = ({ addTaskList }) => {
  return <InputWithButtonProps onAddSubtask={addTaskList} placeholder={'Add name list'} buttonText={'Add'} />;
};

export default CreateTaskListTitle;
