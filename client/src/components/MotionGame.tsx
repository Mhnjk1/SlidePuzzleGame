import { useEffect } from 'react';
import { GameHeader } from './GameHeader';
import { PuzzleGrid } from './PuzzleGrid';
import { GameControls } from './GameControls';
import { SummaryDashboard } from './SummaryDashboard';
import { MistakeReview } from './MistakeReview';
import { useMotionGame } from '@/lib/stores/useMotionGame';

export function MotionGame() {
  const { 
    showSummary, 
    showMistakeReview, 
    isPlaying,
    startPlaying,
    decrementLevelTimer,
    decrementGlobalTimer,
  } = useMotionGame();

  useEffect(() => {
    startPlaying();
  }, [startPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      decrementLevelTimer();
      decrementGlobalTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, decrementLevelTimer, decrementGlobalTimer]);

  if (showSummary && !showMistakeReview) {
    return <SummaryDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex flex-col">
      <GameHeader />
      
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <PuzzleGrid />
      </div>

      {showMistakeReview && <MistakeReview />}
    </div>
  );
}
