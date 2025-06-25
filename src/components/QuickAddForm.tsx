// src/components/QuickAddForm.tsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
    <div>
      <h2 className="card-title mb-4">快速新增</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={8}
            placeholder="貼上你的訓練日誌..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="secondary" onClick={handlePreview}>
            預覽
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!parsedWorkout}>
            儲存訓練
          </Button>
        </div>
      </Form>
      {parsedWorkout && <WorkoutPreview workout={parsedWorkout} />}
    </div>
  );
};

export default QuickAddForm;
