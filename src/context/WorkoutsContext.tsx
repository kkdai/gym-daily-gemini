// src/context/WorkoutsContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Workout } from '../types/types';

interface WorkoutsContextType {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (updatedWorkout: Workout) => void;
  getWorkoutById: (id: string) => Workout | undefined;
}

export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

export const WorkoutsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout: Workout) => {
    setWorkouts(prevWorkouts => [...prevWorkouts, workout]);
  };

  const updateWorkout = (updatedWorkout: Workout) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(workout =>
        workout.id === updatedWorkout.id ? updatedWorkout : workout
      )
    );
  };

  const getWorkoutById = (id: string) => {
    return workouts.find(workout => workout.id === id);
  };

  return (
    <WorkoutsContext.Provider value={{ workouts, addWorkout, updateWorkout, getWorkoutById }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
