import React from 'react';
import TaskItem from './TaskItem';
import TaskInput from './TaskInput';

interface ListViewerProps {
    arrayObjects: {
        id: string;
        title: string;
        isChecked: boolean
    }[];
    setArrayObjects: (arrayObjects: { id: string; title: string; isChecked: boolean }[]) => void;
}

const ListViewer: React.FC<ListViewerProps> = ({ arrayObjects, setArrayObjects }) => {
    const handleCheckboxChange = (id: string) => {
        const updatedTasks = arrayObjects.map(task =>
            task.id === id ? { ...task, isChecked: !task.isChecked } : task
        );
        setArrayObjects(updatedTasks);
    };

    const handleDeleteTask = (id: string) => {
        const updatedTasks = arrayObjects.filter(task => task.id !== id);
        setArrayObjects(updatedTasks);
    };

    const handleTaskTitleChange = (id: string, newTitle: string) => {
        const updatedTasks = arrayObjects.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        );
        setArrayObjects(updatedTasks);
    };

    return (
        <div className="flex flex-col items-center mt-[15px]">
            {arrayObjects.map(task => (
                <div key={task.id} className="flex flex-col items-center justify-between p-4 w-full max-w-md mb-2 bg-gray-300">
                    <label className="flex items-center mb-[15px]">{task.title}</label>
                    <TaskInput
                        taskTitle=""
                        onInputChange={() => {}}
                        onAddTask={() => {}}
                    />
                    <ul className="mt-2 flex flex-col w-full gap-[10px]">
                        <TaskItem
                            id={task.id}
                            title={task.title}
                            isChecked={task.isChecked}
                            onCheckboxChange={() => handleCheckboxChange(task.id)}
                            onDeleteTask={() => handleDeleteTask(task.id)}
                            onTaskTitleChange={(newTitle) => handleTaskTitleChange(task.id, newTitle)}
                        />
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ListViewer;
