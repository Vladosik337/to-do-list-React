import React, {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App.tsx';
import store from './redux/store';
import {fetchTodoById, fetchTodoAll, fetchTodoPost, fetchTodoDeleteById} from './api/api.ts'


// Виклик fetchTodos
// fetchTodoPost();
// fetchTodoAll();
// fetchTodoById(3)
// fetchTodoDeleteById(4);
// fetchTodoAll();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
);
