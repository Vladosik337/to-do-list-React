import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskList } from '../Types';
import { v4 as uuidv4 } from 'uuid';


interface TaskListState {
    taskLists: TaskList[];
}

const initialState: TaskListState = {
    taskLists: [],
};

const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        addTaskList: (state, action: PayloadAction<TaskList>) => {
            state.taskLists.unshift(action.payload);
        },
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
        // Інші ред'юсери для видалення, оновлення і зміни задач
    },
});

export const { addTaskList, addTaskToList } = taskListsSlice.actions;
export default taskListsSlice.reducer;
