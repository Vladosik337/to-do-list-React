export type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: string
};

export type TaskList = {
    id: string;
    title: string;
    tasks: Task[];
};
