import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {TaskList} from '../Types'; // Переконайтеся, що цей шлях правильний і `TaskList` експортується
import {v4 as uuidv4} from 'uuid';
import {Api} from "../api/api.ts";

interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: string;
}

interface TaskListState {
    taskLists: TaskList[];
    loading: boolean;
    error: string | null;
}

const todoApi = new Api();

export const createTodo = createAsyncThunk<TaskList, Partial<TaskList>, { rejectValue: string }>(
    'todos/createTodo',
    async (newTodo, {rejectWithValue}) => {
        try {
            return await todoApi.createTodo({completed: false, title: newTodo.title || 'Нова задача'});
        } catch {
            return rejectWithValue('Не вдалося створити задачу');
        }
    }
);

const initialState: TaskListState = {
    taskLists: [
        {
            id: `taskList-${uuidv4()}`,
            title: 'Init list',
            tasks: [
                {id: `task-${uuidv4()}`, title: 'Init task 1', isCompleted: false, priority: 'low'},
                {id: `task-${uuidv4()}`, title: 'Init task 2', isCompleted: false, priority: 'high'},
                {id: `task-${uuidv4()}`, title: 'Init task 3', isCompleted: true, priority: 'medium'},
                {id: `task-${uuidv4()}`, title: 'Init task 4', isCompleted: false, priority: 'low'},
                {id: `task-${uuidv4()}`, title: 'Init task 5', isCompleted: true, priority: 'low'},
            ],
            filteredTasks: [],
        }
    ],
    loading: false,
    error: null,
};

const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        addTaskList: (state: TaskListState, action: PayloadAction<TaskList>) => {
            state.taskLists = [action.payload, ...state.taskLists];
        },
        addTaskToList: (state: TaskListState, action: PayloadAction<{ listId: string; taskTitle: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                taskList.tasks = [{
                    id: `task-${uuidv4()}`,
                    title: action.payload.taskTitle,
                    isCompleted: false,
                    priority: 'med'
                }, ...taskList.tasks];
            }
        },
        editTaskName: (state: TaskListState, action: PayloadAction<{
            listId: string,
            taskId: string,
            newTitle: string
        }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                const task = taskList.tasks.find((task) => task.id === action.payload.taskId);
                if (task) {
                    task.title = action.payload.newTitle;
                }
            }
        },
        removeTaskFromList: (state: TaskListState, action: PayloadAction<{ listId: string, taskId: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                taskList.tasks = taskList.tasks.filter((task) => task.id !== action.payload.taskId);
            }
        },
        removeTaskList: (state: TaskListState, action: PayloadAction<{ listId: string }>) => {
            state.taskLists = state.taskLists.filter((taskList) => taskList.id !== action.payload.listId);
        },
        updateTaskTitle: (state: TaskListState, action: PayloadAction<{ listId: string, newTitle: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                taskList.title = action.payload.newTitle;
            }
        },
        toggleTaskCompletion: (state: TaskListState, action: PayloadAction<{ listId: string, taskId: string }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                const task = taskList.tasks.find((task) => task.id === action.payload.taskId);
                if (task) {
                    task.isCompleted = !task.isCompleted;
                }
            }
        },
        changePriorityTask: (state: TaskListState, action: PayloadAction<{
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
        filterTaskPriority: (state: TaskListState, action: PayloadAction<{
            listId: string,
            valuePriority: string
        }>) => {
            const taskList = state.taskLists.find((list) => list.id === action.payload.listId);
            if (taskList) {
                taskList.filteredTasks = action.payload.valuePriority === 'All'
                    ? [...taskList.tasks]
                    : taskList.tasks.filter((task) => task.priority === action.payload.valuePriority);
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchTodos.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TaskList[]>) => {
    //             state.loading = false;
    //             state.taskLists = action.payload;
    //         })
    //         .addCase(fetchTodos.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload as string;
    //         });
    // }
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
