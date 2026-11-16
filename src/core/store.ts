import type { Assignment, ControlPoint, GradeRecord, GreeningParams, Placement } from '../types';
import { DEFAULT_ASSIGNMENT, DEFAULT_PARAMS } from './geometry';

const STORAGE_KEY = 'campus-greening-workbench-v1';

interface PersistShape {
  role: 'teacher' | 'student';
  assignment: Assignment;
  params: GreeningParams;
  controlPoints: ControlPoint[];
  placements: Placement[];
  grades: GradeRecord[];
  roadBuilt: boolean;
}

export function loadState(): PersistShape | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistShape;
  } catch {
    return null;
  }
}

export function saveState(state: Omit<PersistShape, never>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // 存储已满或被禁用时静默失败，不影响主流程
  }
}

export function defaultPersistState(): PersistShape {
  return {
    role: 'student',
    assignment: structuredClone(DEFAULT_ASSIGNMENT),
    params: structuredClone(DEFAULT_PARAMS),
    controlPoints: [],
    placements: [],
    grades: [],
    roadBuilt: false,
  };
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
