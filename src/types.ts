export interface Task {
    id: string;
    name: string;
    owner: string;
    command: string;
    taskExecutions: { startTime: string; endTime: string; output: string }[];
  }
  