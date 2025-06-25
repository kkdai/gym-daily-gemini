// src/types/types.ts

export enum ExerciseType {
  Cardio = '有氧',
  Strength = '力量',
}

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  duration?: number; // in minutes
  weight?: number;
  reps?: number;
  sets?: number;
  unit?: 'lbs' | 'kg';
  notes?: string;
}

export interface Workout {
  id: string;
  date: string;
  title?: string;
  exercises: Exercise[];
  notes?: string;
}
