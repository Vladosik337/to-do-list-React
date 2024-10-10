interface Task {
    title: string;
    tasks: string[];
}

interface ListCreatorProps {
    lists: Task[];
    setLists: (lists: Task[]) => void;
    listTitle: string;
    setListTitle: (title: string) => void;
    newListTask: string;
    setNewListTask: (task: string) => void;
    tasks: string[];
    setTasks: (tasks: string[]) => void;
}

const ListCreator = ({
                         lists,
                         setLists,
                         listTitle,
                         setListTitle,
                         newListTask,
                         setNewListTask,
                         tasks,
                         setTasks
                     }: ListCreatorProps) => {
    const addTask = () => {
        if (newListTask.trim() !== '') {
            setTasks([...tasks, newListTask]);
            setNewListTask('');
        }
    };

    const createList = () => {
        if (listTitle.trim() !== '' && tasks.length > 0) {
            const newList = {title: listTitle, tasks};
            setLists([...lists, newList]);
            console.log('Updated Lists:', [...lists, newList])
            setListTitle('');
            setTasks([]);
        } else {
            alert('Заголовок списку або задачі не можуть бути пустими');
        }
    };

    const updateTask = (index: number, value: string) => {
        const updatedTasks = tasks.map((task, i) => (i === index ? value : task));
        setTasks(updatedTasks);
    };

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <label htmlFor="create-title" className="block mb-2 text-lg font-semibold text-gray-700">
                Заголовок списку
                <input
                    type="text"
                    id="create-title"
                    placeholder="Введіть заголовок"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-amber-400"
                />
            </label>
            <ul className="space-y-4">
                {tasks.map((task, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow">
                        <textarea
                            className="w-full h-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-amber-400 resize-none"
                            value={task}
                            onChange={(e) => updateTask(index, e.target.value)}
                        />
                        <button
                            className="ml-2 p-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                            onClick={() => removeTask(index)}
                        >
                            Видалити
                        </button>
                    </li>
                ))}
                <li className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow">
                    <textarea
                        placeholder="Введіть задачу"
                        className="w-full h-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-amber-400 resize-none"
                        value={newListTask}
                        onChange={(e) => setNewListTask(e.target.value)}
                    />
                    <button
                        className="ml-2 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={addTask}>
                        Додати завдання
                    </button>
                </li>
            </ul>
            <button
                className="mt-4 w-full p-2 text-white bg-amber-600 rounded-md hover:bg-amber-700 transition duration-200"
                onClick={createList}>
                Сторити нотатку для виконання
            </button>
        </div>
    );
};

export default ListCreator;
