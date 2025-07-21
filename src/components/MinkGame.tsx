import { useState, useEffect, useCallback } from 'react';
import { GameCanvas } from './GameCanvas';
import { GameUI } from './GameUI';
import { StoryPanel } from './StoryPanel';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';
import { storyScenes } from '@/data/storyScenes';
import { useToast } from '@/hooks/use-toast';
import { Play, RotateCcw, Info } from 'lucide-react';

const initialGameState: GameState = {
  phase: 'intro',
  mink: {
    id: 'player-mink',
    position: { x: 50, y: 350 },
    width: 30,
    height: 24,
    isHidden: false,
    hasFood: false,
    noiseLevel: 0,
    detectionLevel: 0
  },
  lightZones: [
    {
      id: 'farm-light-1',
      position: { x: 250, y: 100 },
      width: 120,
      height: 120,
      intensity: 0.8,
      isActive: true
    },
    {
      id: 'house-light',
      position: { x: 450, y: 50 },
      width: 100,
      height: 100,
      intensity: 0.6,
      isActive: true
    }
  ],
  chickens: [
    {
      id: 'chicken-1',
      position: { x: 300, y: 180 },
      width: 32,
      height: 32,
      isAlerted: false,
      alertRadius: 60
    }
  ],
  objectives: [
    'Exit the den safely',
    'Approach the chicken coop',
    'Steal food without being detected',
    'Escape back to the den'
  ],
  completedObjectives: [],
  detectionMeter: 0,
  gameTime: 0,
  isGameOver: false,
  hasWon: false
};

export const MinkGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentScene, setCurrentScene] = useState('intro');
  const [showGame, setShowGame] = useState(false);
  const { toast } = useToast();

  const handleSceneChange = useCallback((newScene: string) => {
    setCurrentScene(newScene);
    
    // Update game state based on scene
    if (newScene === 'theft') {
      setGameState(state => ({ 
        ...state, 
        phase: 'theft',
        completedObjectives: [...state.completedObjectives, 'Exit the den safely', 'Approach the chicken coop']
      }));
      setShowGame(true);
    } else if (newScene === 'escape') {
      setGameState(state => ({ 
        ...state, 
        phase: 'escape'
      }));
    } else if (newScene === 'return') {
      setGameState(state => ({ 
        ...state, 
        phase: 'return',
        completedObjectives: [...state.completedObjectives, 'Escape back to the den']
      }));
      setShowGame(false);
    } else if (newScene === 'intro') {
      // Reset game
      setGameState(initialGameState);
      setShowGame(false);
    }
  }, []);

  const handleChoice = useCallback((nextScene: string) => {
    handleSceneChange(nextScene);
  }, [handleSceneChange]);

  const handleContinue = useCallback(() => {
    const scene = storyScenes[currentScene];
    if (scene.nextScene) {
      handleSceneChange(scene.nextScene);
    }
  }, [currentScene, handleSceneChange]);

  const resetGame = () => {
    setGameState(initialGameState);
    setCurrentScene('intro');
    setShowGame(false);
    toast({
      title: "Game Reset",
      description: "Starting a new night hunt...",
    });
  };

  const scene = storyScenes[currentScene];

  return (
    <div className="min-h-screen bg-night p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-moonlight">
            Mink: Night Thief
          </h1>
          <p className="text-muted-foreground">
            A stealth survival demo - Navigate the night to feed your young
          </p>
          <div className="flex justify-center gap-2">
            <Button onClick={resetGame} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
            <Button 
              onClick={() => handleSceneChange('education')} 
              variant="outline" 
              size="sm"
            >
              <Info className="w-4 h-4 mr-2" />
              About Minks
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Story Panel */}
          <div className="lg:col-span-2">
            <StoryPanel
              scene={scene}
              onChoice={handleChoice}
              onContinue={handleContinue}
            />
          </div>

          {/* Game UI */}
          <div>
            <GameUI gameState={gameState} />
          </div>
        </div>

        {/* Game Canvas */}
        {showGame && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-moonlight">
                Interactive Stealth Gameplay
              </h3>
              <p className="text-sm text-muted-foreground">
                Click to move • Avoid the bright lights • Steal the chicken
              </p>
            </div>
            <GameCanvas
              gameState={gameState}
              onUpdateGameState={setGameState}
              onSceneChange={handleSceneChange}
            />
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground border-t border-border pt-4">
          <p>
            Mink: Night Thief Demo • Developed by OÜ Reku • 
            <span className="text-primary ml-1">European minks are critically endangered</span>
          </p>
        </div>
      </div>
    </div>
  );
};