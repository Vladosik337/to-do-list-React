// Определение типов данных для задач и списков задач
export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type TaskList = {
  id: string;
  title: string;
  isCompleted: boolean;
  tasks: Task[];
};
