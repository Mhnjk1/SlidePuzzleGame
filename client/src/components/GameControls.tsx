import { useMotionGame } from '@/lib/stores/useMotionGame';

export function GameControls() {
  const {
    moves,
    getCurrentLevel,
    levelTimer,
  } = useMotionGame();

  const level = getCurrentLevel();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-600">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Instructions
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            1. Drag the blocks to clear a path
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            2. Drag the yellow ball from Start (green S) to End (red E)
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            3. Complete before the {levelTimer}s timer runs out!
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            Current moves: {moves} | Target: {level.minMoves} moves
          </p>
        </div>
      </div>
    </div>
  );
}
