import {useState} from 'react';
import './styles/style.scss';
import ListCreator from "./components/ListCreator";
import ListViewer from "./components/ListViewer";

interface Task {
    title: string;
    tasks: string[];
}

function App() {
    const [lists, setLists] = useState<Task[]>([]); // Зберігаємо всі списки
    const [listTitle, setListTitle] = useState(''); // Заголовок списку
    const [newListTask, setNewListTask] = useState(''); // Нова задача
    const [tasks, setTasks] = useState<string[]>([]); // Список задач

    return (
        <div className="min-h-full flex flex-col items-center justify-center overflow-clip h-screen">
            <ListCreator
                lists={lists}
                setLists={setLists}
                listTitle={listTitle}
                setListTitle={setListTitle}
                newListTask={newListTask}
                setNewListTask={setNewListTask}
                tasks={tasks}
                setTasks={setTasks}
            />
            <ListViewer lists={lists} setLists={setLists}/>
        </div>
    );
}

export default App;
