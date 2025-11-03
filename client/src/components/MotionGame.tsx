import { GameHeader } from './GameHeader';
import { PuzzleGrid } from './PuzzleGrid';
import { GameControls } from './GameControls';
import { SummaryDashboard } from './SummaryDashboard';
import { MistakeReview } from './MistakeReview';
import { useMotionGame } from '@/lib/stores/useMotionGame';

export function MotionGame() {
  const { showSummary, showMistakeReview } = useMotionGame();

  if (showSummary && !showMistakeReview) {
    return <SummaryDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto max-w-7xl">
        <GameHeader />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-400px)] py-8">
          <PuzzleGrid />
        </div>

        <GameControls />
      </div>

      {showMistakeReview && <MistakeReview />}
    </div>
  );
}
