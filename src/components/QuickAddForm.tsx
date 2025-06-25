// src/components/QuickAddForm.tsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import useWorkouts from '../hooks/useWorkouts';
import { parseWorkoutText } from '../utils/parser';
import { Workout } from '../types/types';
import WorkoutPreview from './WorkoutPreview';

interface QuickAddFormProps {
  onSave: () => void;
}

const QuickAddForm: React.FC<QuickAddFormProps> = ({ onSave }) => {
  const { addWorkout } = useWorkouts();
  const [text, setText] = useState('');
  const [parsedWorkout, setParsedWorkout] = useState<Partial<Workout> | null>(null);

  const handlePreview = () => {
    const workout = parseWorkoutText(text);
    setParsedWorkout(workout);
  };

  const handleSave = () => {
    if (parsedWorkout && parsedWorkout.exercises && parsedWorkout.exercises.length > 0) {
      addWorkout({
        id: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        ...parsedWorkout,
        exercises: parsedWorkout.exercises || [],
      });
      onSave();
    }
  };

  return (
    <Container>
      <h1 className="my-4">快速新增</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="貼上你的訓練日誌..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" onClick={handlePreview} className="me-2">
          預覽
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!parsedWorkout}>
          儲存訓練
        </Button>
      </Form>
      {parsedWorkout && <WorkoutPreview workout={parsedWorkout} />}
    </Container>
  );
};

export default QuickAddForm;
