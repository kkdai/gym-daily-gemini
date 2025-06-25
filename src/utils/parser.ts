// src/utils/parser.ts
import { Workout, Exercise, ExerciseType } from '../types/types';

export const parseWorkoutText = (text: string): Partial<Workout> => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const workout: Partial<Workout> = { exercises: [] };

  const titleLine = lines.find(line => line.startsWith('#'));
  if (titleLine) {
    workout.title = titleLine.replace('#', '').trim();
  }

  const exerciseLines = lines.filter(line => !line.startsWith('#') && !/^\s*$/.test(line));
  
  let generalNotes = '';

  exerciseLines.forEach(line => {
    const cardioRegex = /(.+?)\s+(\d+)\s*mins/i;
    const strengthRegex = /(.+?)\s+(\d+)\s*(lb|kg)s?\s*x\s*(\d+)\s*x\s*(\d+)/i;
    const notesRegex = /\((.+?)\)/;

    const cardioMatch = line.match(cardioRegex);
    const strengthMatch = line.match(strengthRegex);
    const notesMatch = line.match(notesRegex);

    let notes = '';
    if (notesMatch) {
      notes = notesMatch[1];
      line = line.replace(notesRegex, '').trim();
    }

    if (cardioMatch) {
      workout.exercises?.push({
        id: new Date().toISOString() + Math.random(),
        name: cardioMatch[1].trim(),
        type: ExerciseType.Cardio,
        duration: parseInt(cardioMatch[2], 10),
        notes: notes,
      });
    } else if (strengthMatch) {
      workout.exercises?.push({
        id: new Date().toISOString() + Math.random(),
        name: strengthMatch[1].trim(),
        type: ExerciseType.Strength,
        weight: parseInt(strengthMatch[2], 10),
        unit: strengthMatch[3] as 'lbs' | 'kg',
        reps: parseInt(strengthMatch[4], 10),
        sets: parseInt(strengthMatch[5], 10),
        notes: notes,
      });
    } else {
      if (line.trim()) {
        generalNotes += line.trim() + '\n';
      }
    }
  });

  if (generalNotes) {
    workout.notes = generalNotes.trim();
  }

  return workout;
};