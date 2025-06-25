// src/components/WorkoutCard.tsx
import React from 'react';
import { Workout } from '../types/types';
import { Card, ListGroup } from 'react-bootstrap';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{workout.title || workout.date}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{workout.date}</Card.Subtitle>
        <ListGroup variant="flush">
          {workout.exercises.map((e) => (
            <ListGroup.Item key={e.id}>
              {e.name} - 
              {e.type === '有氧' ? ` ${e.duration} 分鐘` : ` ${e.weight}${e.unit} x ${e.reps} x ${e.sets}`}
              {e.notes && <small className="d-block text-muted">{e.notes}</small>}
            </ListGroup.Item>
          ))}
        </ListGroup>
        {workout.notes && <Card.Text className="mt-3">{workout.notes}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default WorkoutCard;
