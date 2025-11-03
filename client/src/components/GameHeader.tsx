import { useMotionGame } from '@/lib/stores/useMotionGame';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export function GameHeader() {
  const { levelTimer, globalTimer, moves, getCurrentLevel } = useMotionGame();
  const { theme, toggleTheme } = useTheme();
  const level = getCurrentLevel();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const levelTimerColor = levelTimer <= 5 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400';
  const globalTimerColor = globalTimer <= 30 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400';

  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 border-b-4 border-emerald-200 dark:border-gray-700 rounded-t-2xl shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Motion Challenge
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-6 h-6 text-gray-800" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Drag blocks AND the ball to reach the end! Auto-advances in 15s per level.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Total game time: 300 seconds (5 minutes)
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-md">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
              LEVEL
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {level.id} / 20
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-md">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
              LEVEL TIME
            </p>
            <p className={`text-2xl font-bold ${levelTimerColor}`}>
              {levelTimer}s
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-md">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
              TOTAL TIME
            </p>
            <p className={`text-2xl font-bold ${globalTimerColor}`}>
              {formatTime(globalTimer)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-md">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
              MOVES
            </p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {moves}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
