export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
  userId?: string;
}

export type NewTask = Omit<Task, "id">;
