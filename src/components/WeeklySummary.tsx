// src/components/WeeklySummary.tsx
import React, { useState, useMemo } from 'react';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';
import useWorkouts from '../hooks/useWorkouts';
import { ExerciseType, Workout } from '../types/types';

const WeeklySummary: React.FC = () => {
  const { workouts } = useWorkouts();
  const [week, setWeek] = useState(new Date());

  const { totalRunningTime, maxWeights } = useMemo(() => {
    const startOfWeek = new Date(week);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weekWorkouts = workouts.filter((w) => {
      const workoutDate = new Date(w.date);
      return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
    });

    const totalRunningTime = weekWorkouts
      .flatMap((w) => w.exercises)
      .filter((e) => e.name.toLowerCase() === 'running' && e.type === ExerciseType.Cardio)
      .reduce((acc, e) => acc + (e.duration || 0), 0);

    const strengthExercises = weekWorkouts
      .flatMap((w) => w.exercises)
      .filter((e) => e.type === ExerciseType.Strength);

    const maxWeights: { [key: string]: { max: number, unit: string, history: Workout[] } } = {};

    strengthExercises.forEach((e) => {
      const workout = weekWorkouts.find(w => w.exercises.includes(e));
      if (!workout) return;

      if (!maxWeights[e.name] || (e.weight || 0) > maxWeights[e.name].max) {
        maxWeights[e.name] = { max: e.weight || 0, unit: e.unit || 'lbs', history: [workout] };
      } else if ((e.weight || 0) === maxWeights[e.name].max) {
        maxWeights[e.name].history.push(workout);
      }
    });

    return { totalRunningTime, maxWeights };
  }, [workouts, week]);

  return (
    <div>
      <h2 className="card-title mb-4">每週總結</h2>
      <Row className="mb-4 align-items-center">
        <Col>
          <Button variant="secondary" onClick={() => setWeek(new Date(week.setDate(week.getDate() - 7)))}>
            &lt;
          </Button>
        </Col>
        <Col className="text-center">
          <h5 className="mb-0">{week.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' })}</h5>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={() => setWeek(new Date(week.setDate(week.getDate() + 7)))}>
            &gt;
          </Button>
        </Col>
      </Row>

      <div className="mb-4">
        <h4 className="card-subtitle mb-2">有氧總結</h4>
        <p>總跑步時間: {totalRunningTime} 分鐘</p>
      </div>

      <div>
        <h4 className="card-subtitle mb-2">力量總結</h4>
        <ListGroup variant="flush">
          {Object.entries(maxWeights).map(([name, data]) => (
            <ListGroup.Item key={name}>
              <strong>{name}:</strong> {data.max}{data.unit} (本週最大重量)
              <ul className="mt-2">
                {data.history.map(w => w.exercises.filter(e => e.name === name).map(e => (
                  <li key={w.id + e.id}>
                    <small>{new Date(w.date).toLocaleDateString('zh-TW')}: {e.weight}{e.unit} x {e.reps} x {e.sets}</small>
                  </li>
                )))}
              </ul>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default WeeklySummary;
