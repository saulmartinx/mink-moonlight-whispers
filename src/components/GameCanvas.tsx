import { useRef, useEffect, useState, useCallback } from 'react';
import { Position, GameState, Mink, LightZone, Chicken } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

interface GameCanvasProps {
  gameState: GameState;
  onUpdateGameState: (updater: (state: GameState) => GameState) => void;
  onSceneChange: (scene: string) => void;
}

export const GameCanvas = ({ gameState, onUpdateGameState, onSceneChange }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Move mink to clicked position
    onUpdateGameState(state => {
      const newMink = { ...state.mink };
      newMink.position = { x: clickX - 15, y: clickY - 15 }; // Center on click
      
      // Check for detection
      const detectionLevel = calculateDetection(newMink, state.lightZones, state.chickens);
      newMink.detectionLevel = detectionLevel;
      
      if (detectionLevel > 0.8) {
        toast({
          title: "Detected!",
          description: "The chickens are alerted. Stay in the shadows!",
          variant: "destructive"
        });
      }
      
      return { ...state, mink: newMink };
    });
  }, [onUpdateGameState, toast]);

  const calculateDetection = (mink: Mink, lightZones: LightZone[], chickens: Chicken[]): number => {
    let detection = 0;
    
    // Check light zone detection
    lightZones.forEach(light => {
      if (light.isActive) {
        const distance = Math.sqrt(
          Math.pow(mink.position.x - light.position.x, 2) + 
          Math.pow(mink.position.y - light.position.y, 2)
        );
        if (distance < light.width / 2) {
          detection = Math.max(detection, light.intensity * (1 - distance / (light.width / 2)));
        }
      }
    });
    
    // Check chicken detection
    chickens.forEach(chicken => {
      const distance = Math.sqrt(
        Math.pow(mink.position.x - chicken.position.x, 2) + 
        Math.pow(mink.position.y - chicken.position.y, 2)
      );
      if (distance < chicken.alertRadius) {
        detection = Math.max(detection, 0.6 * (1 - distance / chicken.alertRadius));
      }
    });
    
    return Math.min(detection, 1);
  };

  const handleObjectClick = useCallback((objectType: string, objectId: string) => {
    if (objectType === 'chicken' && gameState.phase === 'theft') {
      const distance = Math.sqrt(
        Math.pow(gameState.mink.position.x - gameState.chickens[0].position.x, 2) + 
        Math.pow(gameState.mink.position.y - gameState.chickens[0].position.y, 2)
      );
      
      if (distance < 50) {
        onUpdateGameState(state => ({
          ...state,
          mink: { ...state.mink, hasFood: true },
          completedObjectives: [...state.completedObjectives, 'Steal food'],
          phase: 'escape'
        }));
        
        toast({
          title: "Food Acquired!",
          description: "You've grabbed a chicken! Now escape back to the den.",
          variant: "default"
        });
        
        onSceneChange('escape');
      } else {
        toast({
          title: "Too Far",
          description: "Get closer to the chicken coop to steal food.",
          variant: "destructive"
        });
      }
    }
  }, [gameState, onUpdateGameState, onSceneChange, toast]);

  return (
    <div 
      ref={canvasRef}
      className="game-canvas w-full h-96 relative rounded-lg border border-border cursor-crosshair"
      onClick={handleCanvasClick}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-forest-medium rounded-full" />
        <div className="absolute top-20 right-20 w-16 h-32 bg-forest-dark rounded-lg" />
        <div className="absolute bottom-10 left-1/3 w-24 h-12 bg-forest-medium rounded" />
      </div>

      {/* Moonbeams */}
      <div className="moonbeam absolute top-0 left-1/4 w-32 h-full opacity-30" />
      <div className="moonbeam absolute top-0 right-1/3 w-24 h-full opacity-20" />

      {/* Light zones */}
      {gameState.lightZones.map(light => (
        <div
          key={light.id}
          className={`light-zone absolute ${light.isActive ? 'opacity-60' : 'opacity-20'}`}
          style={{
            left: light.position.x,
            top: light.position.y,
            width: light.width,
            height: light.height,
          }}
        />
      ))}

      {/* Chickens */}
      {gameState.chickens.map(chicken => (
        <div
          key={chicken.id}
          className="absolute clickable"
          style={{
            left: chicken.position.x,
            top: chicken.position.y,
            width: chicken.width,
            height: chicken.height,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleObjectClick('chicken', chicken.id);
          }}
        >
          <div className="w-8 h-8 bg-white rounded-full relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
            <div className="absolute bottom-2 left-1/2 w-1 h-2 bg-orange-400 transform -translate-x-1/2" />
          </div>
          {chicken.isAlerted && (
            <div className="absolute -top-2 -right-2 text-danger text-xs">!</div>
          )}
        </div>
      ))}

      {/* Mink character */}
      <div
        className={`mink absolute transition-all duration-300 ${
          gameState.mink.isHidden ? 'hidden' : ''
        }`}
        style={{
          left: gameState.mink.position.x,
          top: gameState.mink.position.y,
          width: gameState.mink.width,
          height: gameState.mink.height,
        }}
      >
        <div className="w-8 h-6 bg-mink rounded-full relative">
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
          <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
          <div className="absolute -bottom-1 left-1/2 w-3 h-1 bg-mink rounded transform -translate-x-1/2" />
          {gameState.mink.hasFood && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
          )}
        </div>
      </div>

      {/* Den location */}
      <div className="absolute bottom-4 left-4 w-12 h-8 bg-forest-dark rounded-lg border border-muted">
        <div className="text-xs text-center text-muted-foreground mt-1">Den</div>
      </div>

      {/* Click instruction */}
      <div className="absolute top-4 left-4 text-moonlight text-sm opacity-70">
        Click to move the mink
      </div>
    </div>
  );
};