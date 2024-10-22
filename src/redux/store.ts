import { configureStore } from '@reduxjs/toolkit';
import taskListsReducer from '../features/taskListsSlice.ts';

const store = configureStore({
    reducer: {
        taskLists: taskListsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
