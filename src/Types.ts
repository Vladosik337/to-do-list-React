export interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: string;
}

export interface TaskList {
    id: string;
    title: string;
    tasks: Task[];
    filteredTasks?: Task[];
}
