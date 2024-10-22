import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskList } from '../Types';
import { v4 as uuidv4 } from 'uuid';

interface TaskListState {
    taskLists: TaskList[]; // Інтерфейс стану списку завдань (масив списків завдань)
}

// Початковий стан з порожнім масивом списків завдань
const initialState: TaskListState = {
    taskLists: [],
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
        // Інші ред'юсери для видалення, оновлення і зміни задач можуть бути додані тут
    },
});


export const { addTaskList, addTaskToList } = taskListsSlice.actions;
export default taskListsSlice.reducer;
