import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StoryScene } from '@/types/game';

interface StoryPanelProps {
  scene: StoryScene;
  onChoice: (choice: string) => void;
  onContinue: () => void;
}

export const StoryPanel = ({ scene, onChoice, onContinue }: StoryPanelProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsTypingComplete(false);
    
    let currentIndex = 0;
    const typeText = () => {
      if (currentIndex < scene.text.length) {
        setDisplayText(scene.text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, 30);
      } else {
        setIsTypingComplete(true);
      }
    };
    
    const timer = setTimeout(typeText, 500);
    return () => clearTimeout(timer);
  }, [scene.text]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-moonlight story-text">{scene.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[120px] p-4 rounded-lg bg-card border border-border">
          <p className="text-foreground story-text leading-relaxed">
            {displayText}
            {!isTypingComplete && (
              <span className="animate-pulse text-primary">|</span>
            )}
          </p>
        </div>
        
        {isTypingComplete && (
          <div className="space-y-2">
            {scene.choices && scene.choices.length > 0 ? (
              <div className="space-y-2">
                {scene.choices.map((choice, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => {
                      if (choice.action) choice.action();
                      onChoice(choice.nextScene);
                    }}
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            ) : (
              <Button 
                onClick={onContinue}
                className="w-full"
                variant="default"
              >
                Continue
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};