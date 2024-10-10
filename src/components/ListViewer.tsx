import React, {useState} from 'react';

interface Task {
    title: string;
    tasks: string[];
}

interface ListViewerProps {
    lists: Task[];
    setLists: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ListViewer = ({lists}: ListViewerProps) => {
    const [complite, setComplite] = useState(false);
    const checkboxComplite = () => {
        setComplite(!complite);
    }

    return (
        <div className="list mt-8 p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
            <h3 className="text-center text-xl font-bold text-gray-700 mb-4">Списки</h3>
            {lists.length === 0 ? (
                <p className="text-center text-gray-500">Немає списків для відображення.</p>
            ) : (
                <ul className="space-y-4">
                    {lists.map((list, index) => (
                        <li key={index} className="border-b pb-4 mb-4">
                            <h4 className="text-lg font-semibold">{list.title}</h4>
                            <ul className="space-y-2">
                                {list.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex}
                                        className={`${complite ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                        <input type="checkbox"
                                               className="h-5 w-5 text-blue-500 focus:ring-blue-400 focus:ring-2 rounded"
                                               onChange={checkboxComplite}/>
                                        {task}
                                        <button
                                            className="text-red-500 hover:text-red-700 transition duration-200">Видалити
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListViewer;
