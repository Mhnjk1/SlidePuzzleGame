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
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
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

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-700 px-4 py-4 rounded-xl shadow-md border-2 border-emerald-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
            LEVEL
          </p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {level.id} / 20
          </p>
        </div>

        <div className="bg-white dark:bg-gray-700 px-4 py-4 rounded-xl shadow-md border-2 border-blue-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
            LEVEL TIME
          </p>
          <p className={`text-3xl font-bold ${levelTimerColor}`}>
            {levelTimer}s
          </p>
        </div>

        <div className="bg-white dark:bg-gray-700 px-4 py-4 rounded-xl shadow-md border-2 border-orange-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
            TOTAL TIME
          </p>
          <p className={`text-3xl font-bold ${globalTimerColor}`}>
            {formatTime(globalTimer)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-700 px-4 py-4 rounded-xl shadow-md border-2 border-purple-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
            MOVES
          </p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {moves}
          </p>
        </div>
      </div>
    </div>
  );
}
