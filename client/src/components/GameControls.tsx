import { useState } from 'react';
import { useMotionGame } from '@/lib/stores/useMotionGame';
import { isPathClear } from '@/utils/pathfinding';
import { useAudio } from '@/lib/stores/useAudio';

export function GameControls() {
  const {
    blocks,
    getCurrentLevel,
    submitSolution,
    nextLevel,
    restartLevel,
    timer,
    isPlaying,
    isPaused,
    startPlaying,
    levelAttempts,
    currentLevelIndex,
  } = useMotionGame();
  
  const { playSuccess, playHit } = useAudio();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'timeout' | null; message: string }>({
    type: null,
    message: '',
  });
  const [canProceed, setCanProceed] = useState(false);

  const level = getCurrentLevel();

  const handleSubmit = () => {
    if (!isPlaying) {
      startPlaying();
      return;
    }

    const gridState = {
      rows: level.gridRows,
      cols: level.gridCols,
      blocks,
    };

    const result = isPathClear(gridState, level.ballStart, level.ballEnd);

    if (result.isReachable) {
      playSuccess();
      submitSolution(true);
      setFeedback({
        type: 'success',
        message: `Puzzle solved! Path found in ${result.path.length - 1} steps.`,
      });
      setCanProceed(true);
    } else {
      playHit();
      submitSolution(false);
      setFeedback({
        type: 'error',
        message: 'No clear path found! The blocks are blocking the way.',
      });
      setCanProceed(true);
    }
  };

  const handleNext = () => {
    setFeedback({ type: null, message: '' });
    setCanProceed(false);
    nextLevel();
  };

  const handleRestart = () => {
    setFeedback({ type: null, message: '' });
    setCanProceed(false);
    restartLevel();
  };

  if (timer === 0 && isPlaying && !canProceed) {
    submitSolution(false);
    setFeedback({
      type: 'timeout',
      message: 'Time is up! Moving to next puzzle.',
    });
    setCanProceed(true);
  }

  const currentAttempt = levelAttempts.find(a => a.levelId === level.id);
  const buttonText = !isPlaying ? 'Start Puzzle' : 'Submit Solution';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {feedback.message && (
        <div
          className={`mb-4 p-4 rounded-lg border-2 ${
            feedback.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300'
              : feedback.type === 'timeout'
              ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-800 dark:text-orange-300'
              : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'
          }`}
        >
          <p className="font-semibold">{feedback.message}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleSubmit}
          disabled={canProceed || isPaused}
          className={`px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
            canProceed || isPaused
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
          }`}
        >
          {buttonText}
        </button>

        <button
          onClick={handleRestart}
          className="px-8 py-3 rounded-lg font-semibold bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          Restart
        </button>

        {canProceed && (
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-lg font-semibold bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-95 transition-all animate-pulse"
          >
            Next Puzzle →
          </button>
        )}
      </div>

      {currentAttempt && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Previous attempt:{' '}
            <span className={currentAttempt.isCorrect ? 'text-green-600' : 'text-red-600'}>
              {currentAttempt.isCorrect ? 'Correct' : 'Incorrect'}
            </span>
            {' '}({currentAttempt.moves} moves)
          </p>
        </div>
      )}
    </div>
  );
}
