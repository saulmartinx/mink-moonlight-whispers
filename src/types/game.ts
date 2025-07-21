export interface Position {
  x: number;
  y: number;
}

export interface GameObject {
  id: string;
  position: Position;
  width: number;
  height: number;
}

export interface Mink extends GameObject {
  isHidden: boolean;
  hasFood: boolean;
  noiseLevel: number;
  detectionLevel: number;
}

export interface LightZone extends GameObject {
  intensity: number;
  isActive: boolean;
}

export interface Chicken extends GameObject {
  isAlerted: boolean;
  alertRadius: number;
}

export interface GameState {
  phase: 'intro' | 'emergence' | 'approach' | 'theft' | 'escape' | 'return' | 'outro';
  mink: Mink;
  lightZones: LightZone[];
  chickens: Chicken[];
  objectives: string[];
  completedObjectives: string[];
  detectionMeter: number;
  gameTime: number;
  isGameOver: boolean;
  hasWon: boolean;
}

export interface StoryScene {
  id: string;
  title: string;
  text: string;
  background?: string;
  nextScene?: string;
  choices?: StoryChoice[];
}

export interface StoryChoice {
  text: string;
  nextScene: string;
  action?: () => void;
}