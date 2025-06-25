// src/components/WorkoutCard.tsx
import React from 'react';
import { Workout } from '../types/types';
import { ListGroup, Button } from 'react-bootstrap';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onEdit }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-1">{workout.title || new Date(workout.date).toLocaleDateString('zh-TW')}</h5>
        <small>{workout.exercises.map(e => e.name).join(', ')}</small>
      </div>
      <Button variant="secondary" size="sm" onClick={onEdit}>
        查看
      </Button>
    </ListGroup.Item>
  );
};

export default WorkoutCard;
