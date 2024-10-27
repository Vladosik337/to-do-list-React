import axios from "axios";

// Пост запит на додання тасок
export async function fetchTodoPost() {
    try {
        await axios.post('https://jsonplaceholder.typicode.com/todos', {
            completed: false,
            id: 3,
            title: "test1122"
        });
    } catch (error) {
        console.error("Помилка під час запиту POST:", error);
    }
}

// Отримання всіх тасок
export async function fetchTodoAll() {
    try {
        const response = await axios.get('http://localhost:5005/todo');
        console.log(response.data);
    } catch (error) {
        console.error("Помилка під час запиту(fetchTodoAll):", error);
    }
}

// Отримання тасок за ID
export async function fetchTodoById(todoId) {
    try {
        const response = await axios.get(`http://localhost:5005/todo/${todoId}`);
        console.log(response.data.title);
    } catch (error) {
        console.error("Помилка під час запиту (fetchTodoById):", error);
    }
}

//Видалення тасок за ID
export async function fetchTodoDeleteById(todoId) {
    try {
        const response = await axios.delete(`http://localhost:5005/todo/${todoId}`)
        console.log(`таска за ID${response.data.id} ВИДАЛЕНА!`);
    } catch (error) {
        console.error("Помилка під час запиту (fetchTodoDeleteById):", error)
    }

}
