import React from 'react';
import SubtaskInput from './TaskList/SubtaskInput.tsx';

interface CreateTaskListTitleProps {
  addTaskList: (title: string) => void;
}

const CreateTaskListTitle: React.FC<CreateTaskListTitleProps> = ({ addTaskList }) => {
  return <SubtaskInput onAddSubtask={addTaskList} placeholder={'Add name list'} buttonText={'Add'} />;
};

export default CreateTaskListTitle;
