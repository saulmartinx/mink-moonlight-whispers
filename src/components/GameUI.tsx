import { GameState } from '@/types/game';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, Volume2, Target } from 'lucide-react';

interface GameUIProps {
  gameState: GameState;
}

export const GameUI = ({ gameState }: GameUIProps) => {
  return (
    <div className="game-ui rounded-lg p-4 space-y-4">
      {/* Detection Meter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-danger" />
          <span className="text-sm font-medium">Detection Level</span>
        </div>
        <div className="relative">
          <Progress 
            value={gameState.mink.detectionLevel * 100} 
            className="h-3"
          />
          <div 
            className="absolute top-0 left-0 h-full stealth-meter rounded opacity-80"
            style={{ width: `${gameState.mink.detectionLevel * 100}%` }}
          />
        </div>
      </div>

      {/* Noise Level */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Noise Level</span>
        </div>
        <Progress value={gameState.mink.noiseLevel * 100} className="h-2" />
      </div>

      {/* Current Objectives */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Objectives</span>
        </div>
        <div className="space-y-1">
          {gameState.objectives.map((objective, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge 
                variant={gameState.completedObjectives.includes(objective) ? "default" : "secondary"}
                className="text-xs"
              >
                {gameState.completedObjectives.includes(objective) ? "✓" : "○"}
              </Badge>
              <span className={`text-xs ${
                gameState.completedObjectives.includes(objective) 
                  ? "text-safe line-through" 
                  : "text-foreground"
              }`}>
                {objective}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Game Status */}
      <div className="pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Phase:</span>
          <Badge variant="outline" className="text-xs">
            {gameState.phase.charAt(0).toUpperCase() + gameState.phase.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">Status:</span>
          <span className={`text-xs ${
            gameState.mink.hasFood ? "text-safe" : "text-muted-foreground"
          }`}>
            {gameState.mink.hasFood ? "Carrying Food" : "Empty Handed"}
          </span>
        </div>
      </div>
    </div>
  );
};