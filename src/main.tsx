import React, {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App.tsx';
import store from './redux/store';
import {Api} from './api/api.ts'

// Створення  класу Api
const todoApi = new Api();

// Виклик методів класу
// todoApi.createTodo({completed: false, title: 'asdop'});
// todoApi.getTodoById(5);
// todoApi.deleteTodoById(5);;
// todoApi.deleteAllTodos();
await todoApi.updateTodoById(43, {
    title: 'Новий заголовок',
    completed: true
});
todoApi.getAllTodos();


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
);
