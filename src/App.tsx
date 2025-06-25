// src/App.tsx
import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import Dashboard from './components/Dashboard';
import WorkoutForm from './components/WorkoutForm';
import WeeklySummary from './components/WeeklySummary';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { WorkoutsProvider } from './context/WorkoutsContext';
import QuickAddForm from './components/QuickAddForm';

type View = 'dashboard' | 'workout-form' | 'weekly-summary' | 'quick-add';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | undefined>();

  const handleNav = (selectedView: View) => {
    setView(selectedView);
    setSelectedWorkoutId(undefined);
  };

  const handleEditWorkout = (id: string) => {
    setSelectedWorkoutId(id);
    setView('workout-form');
  };

  const renderView = () => {
    switch (view) {
      case 'workout-form':
        return (
          <WorkoutForm
            workoutId={selectedWorkoutId}
            onSave={() => handleNav('dashboard')}
          />
        );
      case 'weekly-summary':
        return <WeeklySummary />;
      case 'quick-add':
        return <QuickAddForm onSave={() => handleNav('dashboard')} />;
      default:
        return (
          <Dashboard
            onAddWorkout={() => handleNav('workout-form')}
            onEditWorkout={handleEditWorkout}
          />
        );
    }
  };

  return (
    <WorkoutsProvider>
      <div className="main-container">
        <Nav variant="tabs" defaultActiveKey="dashboard" onSelect={(k) => handleNav(k as View)}>
          <Nav.Item>
            <Nav.Link eventKey="dashboard">儀表板</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="workout-form">新增</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="quick-add">快速新增</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="weekly-summary">總結</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="card-futuristic">
          {renderView()}
        </div>
      </div>
    </WorkoutsProvider>
  );
};

export default App;