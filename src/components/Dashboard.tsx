// src/components/Dashboard.tsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import useWorkouts from '../hooks/useWorkouts';
import WorkoutCard from './WorkoutCard';

interface DashboardProps {
    onAddWorkout: () => void;
    onEditWorkout: (id: string) => void;
  }
  
  const Dashboard: React.FC<DashboardProps> = ({ onAddWorkout, onEditWorkout }) => {
    const { workouts } = useWorkouts();
  
    return (
      <Container>
        <h1 className="my-4">健身日誌</h1>
        <Button variant="primary" className="mb-4" onClick={onAddWorkout}>
          新增訓練
        </Button>
        <div>
          {workouts.map((workout) => (
            <div key={workout.id}>
              <WorkoutCard workout={workout} />
              <Button variant="secondary" size="sm" onClick={() => onEditWorkout(workout.id)}>
                編輯
              </Button>
            </div>
          ))}
        </div>
      </Container>
    );
  };
  
  export default Dashboard;