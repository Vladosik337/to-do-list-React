import axios, {AxiosInstance} from "axios";

interface Todo {
    completed: boolean;
    id: number;
    title: string;
}

export class Api {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5005',
            paramsSerializer: {
                indexes: null,
            },
        });
    }

    // Створення нової задачі
    async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
        try {
            const response = await this.api.post<Todo>('/todo', todo);
            console.log("Задача успішно додана:", response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Помилка під час створення задачі:", error.message);
                throw error;
            }
            throw new Error("Невідома помилка під час створення задачі");
        }
    }

    // Отримання всіх задач
    async getAllTodos(): Promise<Todo[]> {
        try {
            const response = await this.api.get<Todo[]>('/todo');
            console.log(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Помилка під час отримання всіх задач:", error.message);
                throw error;
            }
            throw new Error("Невідома помилка під час отримання всіх задач");
        }
    }

    // Отримання задачі за ID
    async getTodoById(todoId: number): Promise<Todo> {
        try {
            const response = await this.api.get<Todo>(`/todo/${todoId}`);
            console.log(response.data.title);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Помилка під час отримання задачі за ID:", error.message);
                throw error;
            }
            throw new Error("Невідома помилка під час отримання задачі за ID");
        }
    }

    // Видалення задачі за ID
    async deleteTodoById(todoId: number): Promise<void> {
        try {
            await this.api.delete(`/todo/${todoId}`);
            console.log(`Задача за ID ${todoId} видалена!`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Помилка під час видалення задачі за ID:", error.message);
                throw error;
            }
            throw new Error("Невідома помилка під час видалення задачі за ID");
        }
    }

    // Видалення всіх задач
    async deleteAllTodos(): Promise<void> {
        try {
            await this.api.delete(`/todo`);
            console.log(`Всі задачі видалені!`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Помилка під час видалення всіх задач:", error.message);
                throw error;
            }
            throw new Error("Невідома помилка під час видалення всіх задач");
        }
    }

    // Оновлення задач
    async updateTodoById(todoId: number, updatedTodo: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
        try {
            const response = await this.api.patch<Todo>(`/todo/${todoId}`, updatedTodo);
            console.log(`Задача за ID ${todoId} успішно оновлена:`, response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Помилка під час оновлення задачі за ID:", error.message);
                throw error;
            }
            throw new Error("Невідома помилка під час оновлення задачі за ID");
        }
    }

}
