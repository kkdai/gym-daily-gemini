// src/components/WorkoutPreview.tsx
import React from 'react';
import { Workout } from '../types/types';
import { Card, ListGroup } from 'react-bootstrap';

interface WorkoutPreviewProps {
  workout: Partial<Workout>;
}

const WorkoutPreview: React.FC<WorkoutPreviewProps> = ({ workout }) => {
  return (
    <Card className="mt-4" bg="dark" text="white">
      <Card.Header as="h5">預覽</Card.Header>
      <Card.Body>
        {workout.title && <Card.Title>{workout.title}</Card.Title>}
        <ListGroup variant="flush">
          {workout.exercises?.map((e) => (
            <ListGroup.Item key={e.id} className="bg-dark text-white">
              <strong>{e.name}</strong> ({e.type})
              {e.type === '有氧' && ` - ${e.duration} 分鐘`}
              {e.type === '力量' && ` - ${e.weight}${e.unit} x ${e.reps} x ${e.sets}`}
              {e.notes && <small className="d-block text-muted">筆記: {e.notes}</small>}
            </ListGroup.Item>
          ))}
        </ListGroup>
        {workout.notes && <Card.Text className="mt-3"><strong>總結筆記:</strong> {workout.notes}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default WorkoutPreview;
