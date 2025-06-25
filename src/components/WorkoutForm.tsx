// src/components/WorkoutForm.tsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { Workout, Exercise } from '../types/types';
import useWorkouts from '../hooks/useWorkouts';
import ExerciseForm from './ExerciseForm';

interface WorkoutFormProps {
  workoutId?: string;
  onSave: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ workoutId, onSave }) => {
  const { addWorkout, updateWorkout, getWorkoutById } = useWorkouts();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (workoutId) {
      const workout = getWorkoutById(workoutId);
      if (workout) {
        setDate(workout.date);
        setExercises(workout.exercises);
        setNotes(workout.notes || '');
      }
    }
  }, [workoutId, getWorkoutById]);

  const handleAddExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  const handleSave = () => {
    const workout: Workout = {
      id: workoutId || new Date().toISOString(),
      date,
      exercises,
      notes,
    };
    if (workoutId) {
      updateWorkout(workout);
    } else {
      addWorkout(workout);
    }
    onSave();
  };

  return (
    <Container>
      <h1 className="my-4">{workoutId ? '編輯' : '新增'}訓練</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>日期</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <h3 className="my-4">練習</h3>
        <ListGroup className="mb-4">
          {exercises.map((ex) => (
            <ListGroup.Item key={ex.id}>
              {ex.name} - 
              {ex.type === '有氧' ? ` ${ex.duration} 分鐘` : ` ${ex.weight}${ex.unit} x ${ex.reps} x ${ex.sets}`}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <ExerciseForm onAddExercise={handleAddExercise} />

        <Form.Group className="mb-3">
          <Form.Label>筆記</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSave}>
          儲存訓練
        </Button>
      </Form>
    </Container>
  );
};

export default WorkoutForm;
