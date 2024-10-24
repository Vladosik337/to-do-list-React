import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskList} from '../Types';
import {v4 as uuidv4} from 'uuid';
import store from "../redux/store.ts";
import {list} from "postcss";
import {Simulate} from "react-dom/test-utils";
import stalled = Simulate.stalled;

interface TaskListState {
    taskLists: TaskList[]; // Інтерфейс стану списку завдань (масив списків завдань)
}

// Початковий стан
const initialState = <TaskListState>{
    taskLists: [
        {
            id: uuidv4(),
            title: 'Init list',
            tasks: [
                {id: uuidv4(), title: 'Init task', isCompleted: false},
                {id: uuidv4(), title: 'Init task', isCompleted: true}
            ]
        }
    ],
};

// Створення слайсу taskLists з двома ред'юсерами: додавання списку задач і додавання задачі до списку
const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState, // Початковий стан
    reducers: {
        // Ред'юсер для додавання нового списку завдань
        addTaskList: (state, action: PayloadAction<TaskList>) => {
            // Додаємо новий список завдань на початок масиву taskLists
            state.taskLists.unshift(action.payload);
        },
        // Ред'юсер для додавання нової задачі до певного списку
        addTaskToList: (state, action: PayloadAction<{ listId: string; taskTitle: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                taskList.tasks.unshift({
                    id: `task-${uuidv4()}`,
                    title: action.payload.taskTitle,
                    isCompleted: false,
                });
            }
        },
        // Ред'юсер для зміни назви задачи
        editTaskName: (state, action: PayloadAction<{ listId: string, taskId: string, newTitle: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                const task = taskList.tasks.find((task) => task.id === action.payload.taskId);
                if (task) {
                    task.title = action.payload.newTitle;
                }
            }
        },
        // Ред'юсер для видалення задачи з списка
        removeTaskFromList: (state, action: PayloadAction<{ listId: string, taskId: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);

            if (taskList) {
                taskList.tasks = taskList.tasks.filter((task) => task.id !== action.payload.taskId)
            }
        },
        // Ред'юсер для удаления списка задач
        removeTaskList: (state, action: PayloadAction<{ listId: string }>) => {
            state.taskLists = state.taskLists.filter((taskList) => taskList.id !== action.payload.listId)
        },
        // Ред'юсер для изменения названия списка
        updateTaskTitle: (state, action: PayloadAction<{ listId: string, newTitle: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId)
            if (taskList) {
                taskList.title = action.payload.newTitle
            }
        },
        // Ред'юсер для переключения состояния выполнения задачи
        toggleTaskCompletion: (state, action: PayloadAction<{ listId: string, taskId: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId)
            if (taskList) {
                const task = taskList.tasks.find((task) => task.id === action.payload.taskId)
                if (task) {
                    task.isCompleted = !task.isCompleted
                }
            }
        },
    },
});


export const {
    addTaskList,
    addTaskToList,
    editTaskName,
    removeTaskFromList,
    removeTaskList,
    updateTaskTitle,
    toggleTaskCompletion
} = taskListsSlice.actions;
export default taskListsSlice.reducer;

