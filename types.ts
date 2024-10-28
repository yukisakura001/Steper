export interface GoalType {
  id: number;
  content: string;
  deadLine: string;
  future: string;
}

export interface StepType {
  id: number;
  content: string;
  deadLine: string;
  clearTime: string;
  goalId: number;
  reward: string;
}
