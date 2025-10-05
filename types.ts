export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  recurrence: Recurrence;
  priority: Priority;
  completedAt: string | null;
}

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export enum Recurrence {
  NONE = 'none',
  DAILY = 'daily',
}

export enum Priority {
  IMPORTANT_URGENT = 'iu',
  IMPORTANT_NOT_URGENT = 'inu',
  NOT_IMPORTANT_URGENT = 'niu',
  NOT_IMPORTANT_NOT_URGENT = 'ninu',
}