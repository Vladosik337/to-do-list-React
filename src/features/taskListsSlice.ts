import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {TaskList} from '../Types';
import {v4 as uuidv4} from 'uuid';
import {Api} from "../api/api.ts";

interface TaskListState {
    taskLists: TaskList[];
}

const todoApi = new Api();

// Async thunk to create a task
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

// Async thunk to get all tasks
export const getAllTasks = createAsyncThunk<TaskList[], { rejectValue: string }>(
    'taskLists/getAllTasks',
    async (_, {rejectWithValue}) => {
        try {
            return await todoApi.getAllTodos();
        } catch (error) {
            return rejectWithValue('Не вдалося отримати задачі');
        }
    }
);

// Async thunk delete task for id
export const deleteTaskForId = createAsyncThunk<string, { rejectValue: string }>(
    'taskLists/deleteTaskForId',
    async (id, { rejectWithValue }) => {
        try {
            await todoApi.deleteTodoById(Number(id));
        } catch (error) {
            return rejectWithValue('Не вдалося видалити задачу');
        }
    }
);

const initialState: TaskListState = {
    taskLists: [
        // {
        //     id: `taskList-${uuidv4()}`,
        //     title: 'Init list',
        //     tasks: [
        //         {id: `task-${uuidv4()}`, title: 'Init task 1', isCompleted: false, priority: 'low'},
        //         {id: `task-${uuidv4()}`, title: 'Init task 2', isCompleted: false, priority: 'high'},
        //         {id: `task-${uuidv4()}`, title: 'Init task 3', isCompleted: true, priority: 'medium'},
        //         {id: `task-${uuidv4()}`, title: 'Init task 4', isCompleted: false, priority: 'low'},
        //         {id: `task-${uuidv4()}`, title: 'Init task 5', isCompleted: true, priority: 'low'},
        //     ],
        //     filteredTasks: [],
        // }
    ],
};
const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        addTaskList: (state, action: PayloadAction<TaskList>) => {
            state.taskLists.unshift(action.payload);
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
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.fulfilled, (state, action: PayloadAction<TaskList[]>) => {
                console.log('Fetched task lists:', action.payload);
                state.taskLists = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                console.error(action.payload);
            })
            .addCase(deleteTaskForId.fulfilled, (state, action) => {
                state.taskLists = state.taskLists.filter((task) => task.id !== action.meta.arg);
                console.log('Fetched task lists:', state.taskLists);

            });
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
