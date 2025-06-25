// src/components/ExerciseForm.tsx
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Exercise, ExerciseType } from '../types/types';

interface ExerciseFormProps {
  onAddExercise: (exercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onAddExercise }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<ExerciseType>(ExerciseType.Strength);
  const [duration, setDuration] = useState(0);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExercise: Exercise = {
      id: new Date().toISOString(),
      name,
      type,
      ...(type === ExerciseType.Cardio
        ? { duration }
        : { weight, reps, sets, unit }),
    };
    onAddExercise(newExercise);
    setName('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="��動名稱"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Col>
        <Col>
          <Form.Select
            value={type}
            onChange={(e) => setType(e.target.value as ExerciseType)}
          >
            <option value={ExerciseType.Strength}>力量</option>
            <option value={ExerciseType.Cardio}>有氧</option>
          </Form.Select>
        </Col>
      </Row>

      {type === ExerciseType.Cardio ? (
        <Row>
          <Col>
            <Form.Control
              type="number"
              placeholder="持續時間 (分鐘)"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Form.Control
              type="number"
              placeholder="重量"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </Col>
          <Col>
            <Form.Select value={unit} onChange={(e) => setUnit(e.target.value as 'lbs' | 'kg')}>
              <option value="lbs">磅</option>
              <option value="kg">公斤</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="次數"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="組數"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
            />
          </Col>
        </Row>
      )}
      <Button type="submit" className="mt-3">新增運動</Button>
    </Form>
  );
};

export default ExerciseForm;
