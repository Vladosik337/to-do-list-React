import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskList} from '../Types';
import {v4 as uuidv4} from 'uuid';
import store from "../redux/store.ts";
import {list} from "postcss";
import {Simulate} from "react-dom/test-utils";
import stalled = Simulate.stalled;

interface TaskListState {
    taskLists: TaskList[];
}

// Початковий стан
const initialState = <TaskListState>{
    taskLists: [
        {
            id: uuidv4(),
            title: 'Init list',
            tasks: [
                {id: uuidv4(), title: 'Init task 1', isCompleted: false, priority: 'low'},
                {id: uuidv4(), title: 'Init task 2', isCompleted: false, priority: 'high'},
                {id: uuidv4(), title: 'Init task 3', isCompleted: true, priority: 'medium'},
            ],
        }
    ],
};


const filterTask: [] = []
// Створення слайсу taskLists з двома ред'юсерами: додавання списку задач і додавання задачі до списку
const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
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
                    priority: 'med'
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
        // Ред'юсер для вибору приорітету завдання
        changePriorityTask: (state, action: PayloadAction<{
            listId: string,
            taskId: string,
            valuePriority: string
        }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                const task = taskList.tasks.find((task) => task.id === action.payload.taskId);
                if (task) {
                    task.priority = action.payload.valuePriority;
                }
            }
        },
        // Ред'юсер для фільтру приорітету завдань
        filterTaskPriority: (state, action: PayloadAction<{
            listId: string,
            taskIds: string[], // Змінюємо на масив
            valuePriority: string
        }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                if (Array.isArray(action.payload.taskIds)) {
                    action.payload.taskIds.forEach((taskId) => {
                        const task = taskList.tasks.find((task) => task.id === taskId);
                        if (task) {
                            if (action.payload.valuePriority === 'low') {
                                console.log('action = Low')
                                console.log(taskList)
                                task.filter((task) => task.id.action.payload.valuePriority === 'low')
                                console.log(task.filter((task) => task.id.action.payload.valuePriority === 'low'))

                            } else if (action.payload.valuePriority === 'medium') {
                                console.log('action = Medium')
                            } else if (action.payload.valuePriority === 'high') {
                                console.log('action = High')
                            } else {
                                console.log('action = All')
                            }
                        }
                    });
                }
            }
        }


    },
});


export const {
    addTaskList,
    addTaskToList,
    editTaskName,
    removeTaskFromList,
    removeTaskList,
    updateTaskTitle,
    toggleTaskCompletion,
    changePriorityTask,
    filterTaskPriority
} = taskListsSlice.actions;
export default taskListsSlice.reducer;

