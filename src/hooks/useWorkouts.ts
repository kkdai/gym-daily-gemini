// src/hooks/useWorkouts.ts
import { useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutsContext';

const useWorkouts = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutsProvider');
  }
  return context;
};

export default useWorkouts;
