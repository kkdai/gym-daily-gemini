// src/components/WeeklySummary.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import useWorkouts from '../hooks/useWorkouts';
import { Exercise, ExerciseType, Workout } from '../types/types';

const WeeklySummary: React.FC = () => {
  const { workouts } = useWorkouts();
  const [week, setWeek] = useState(new Date());

  const getWeekWorkouts = () => {
    const startOfWeek = new Date(week);
    startOfWeek.setDate(week.getDate() - week.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return workouts.filter((w) => {
      const workoutDate = new Date(w.date);
      return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
    });
  };

  const calculateSummary = () => {
    const weekWorkouts = getWeekWorkouts();
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
  };

  const { totalRunningTime, maxWeights } = calculateSummary();

  return (
    <Container>
      <h1 className="my-4">每週總結</h1>
      <Row className="mb-4">
        <Col>
          <Button onClick={() => setWeek(new Date(week.setDate(week.getDate() - 7)))}>
            上一週
          </Button>
        </Col>
        <Col className="text-center">
          <h4>{week.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setWeek(new Date(week.setDate(week.getDate() + 7)))}>
            下一週
          </Button>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>有氧總結</Card.Title>
          <Card.Text>總跑步時間: {totalRunningTime} 分鐘</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>力量總結</Card.Title>
          {Object.entries(maxWeights).map(([name, data]) => (
            <div key={name}>
              <h5>{name}: {data.max}{data.unit} (本週最大重量)</h5>
              <ul>
                {data.history.map(w => w.exercises.filter(e => e.name === name).map(e => (
                  <li key={w.id + e.id}>
                    {new Date(w.date).toLocaleDateString('zh-TW')}: {e.weight}{e.unit} x {e.reps} x {e.sets}
                  </li>
                )))}
              </ul>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WeeklySummary;
