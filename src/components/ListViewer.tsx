import React from 'react';

interface TaskInputProps {
    tasks: string[];
    setTasks: (tasks: string) => void;
}

const ListViewer: React.FC<TaskInputProps> = ({ tasks, setTasks }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTasks(e.target.value);
    };

    const taskTeg = tasks.map((el)=>{
        return(
            <label htmlFor="task-input">
                <input type="checkbox"/>
                <input
                    type="text"
                    id="task-input"
                    placeholder="your task"
                    value={el}
                    onChange={handleInputChange}
                />
                <button className="text-[#FFF]">Delete</button>
            </label>
        )
    })

    return (
        <div className={'flex flex-col'}>
            {taskTeg}
        </div>
    );
};

export default ListViewer;
