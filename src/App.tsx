import {useState} from 'react';
import './styles/style.scss';
import ListCreator from "./components/ListCreator";
import ListViewer from "./components/ListViewer";

function App() {
    const [titleTask, setTitleTask] = useState('')
    const [tasks, setTasks] = useState<string[]>([]);

    return (
        <div className="min-h-full flex flex-col items-center justify-center overflow-clip h-screen">
            <ListCreator title_task={titleTask} setTitleTask={setTitleTask} tasks={tasks} setTasks={setTasks}/>
            <ListViewer tasks={tasks} setTasks={setTasks}/>
        </div>
    );
}

export default App;
