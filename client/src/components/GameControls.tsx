import { useMotionGame } from '@/lib/stores/useMotionGame';

export function GameControls() {
  const {
    moves,
    getCurrentLevel,
    levelTimer,
  } = useMotionGame();

  const level = getCurrentLevel();

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-600">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          How to Play
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">1</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 pt-0.5">
              Drag the colored blocks to clear a path
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">2</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 pt-0.5">
              Drag the yellow ball from Start (green S) to End (red E)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">3</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 pt-0.5">
              Complete the puzzle before the timer runs out!
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Current moves:</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">{moves}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-gray-600 dark:text-gray-400">Target moves:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{level.minMoves}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
