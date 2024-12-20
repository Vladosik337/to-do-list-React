import React from 'react';
import './styles/style.scss';
import TaskListContainer from './components/TaskList/TaskListContainer';
import CreateTaskListTitle from "./components/CreateTaskListTitle";
import GetTasks from "./components/TaskList/GetTasks.tsx";

function App() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
            <div className="w-full max-w-[965px] bg-white rounded-xl shadow-lg p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Task Manager</h1>
                <CreateTaskListTitle placeholder="Add Task List" buttonText="Add"/>
                {/*<TaskListContainer/>*/}
                <GetTasks/>
            </div>
        </div>
    );
}

export default App
