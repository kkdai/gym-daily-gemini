// src/components/Dashboard.tsx
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import useWorkouts from '../hooks/useWorkouts';
import WorkoutCard from './WorkoutCard';

interface DashboardProps {
    onAddWorkout: () => void;
    onEditWorkout: (id: string) => void;
  }
  
  const Dashboard: React.FC<DashboardProps> = ({ onAddWorkout, onEditWorkout }) => {
    const { workouts } = useWorkouts();
  
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title mb-0">訓練日誌</h2>
          <Button variant="primary" onClick={onAddWorkout}>
            新增
          </Button>
        </div>
        <ListGroup variant="flush">
          {workouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((workout) => (
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
              onEdit={() => onEditWorkout(workout.id)}
            />
          ))}
        </ListGroup>
      </div>
    );
  };
  
  export default Dashboard;