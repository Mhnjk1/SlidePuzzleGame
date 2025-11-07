import { useMotionGame } from "@/lib/stores/useMotionGame";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function GameHeader() {
  const { levelTimer, globalTimer, moves, getCurrentLevel } = useMotionGame();
  const { theme, toggleTheme } = useTheme();
  const level = getCurrentLevel();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const levelTimerColor =
    levelTimer <= 5
      ? "text-red-600 dark:text-red-400"
      : "text-emerald-600 dark:text-emerald-400";
  const globalTimerColor =
    globalTimer <= 30
      ? "text-red-600 dark:text-red-400"
      : "text-blue-600 dark:text-blue-400";

  return (
    <div className="w-full bg-white/90 dark:bg-black-800/90 backdrop-blur-sm border-b-2 border-black-200 dark:border-black-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-lg md:text-xl font-bold text-black-800 dark:text-black-100">
                Motion Challenge
              </h1>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full bg-black-100 dark:bg-black-700 hover:bg-black-200 dark:hover:bg-black-600 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-black-800" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-400" />
                )}
              </button>
            </div>

            <div className="border-l border-black-300 dark:border-black-600 pl-3 md:pl-4">
              <div className="space-y-0.5">
                <p className="text-m text-black-600 dark:text-black-400">
                  1. Blocks can moved horizontally or vertically to clear the
                  path
                </p>
                <p className="text-m text-black-600 dark:text-black-400">
                  2. Drag ball from Start(S)(green) to End(E)(red)
                </p>
                <p className="text-m text-black-500 dark:text-black-500">
                  Complete the puzzle before the timer runs out!
                </p>
                <p className="text-m font-bold text-black-500 dark:text-black-500">
                  Target Moves: {level.minMoves}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-600">
              <p className="text-xs text-black-500 dark:text-black-400 font-medium">
                LEVEL
              </p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {level.id}/20
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-600">
              <p className="text-xs text-black-500 dark:text-black-400 font-medium">
                LEVEL TIME
              </p>
              <p className={`text-lg font-bold ${levelTimerColor}`}>
                {levelTimer}s
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-600">
              <p className="text-xs text-black-500 dark:text-black-400 font-medium">
                Total Time
              </p>
              <p className={`text-lg font-bold ${globalTimerColor}`}>
                {formatTime(globalTimer)}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-600">
              <p className="text-xs text-black-500 dark:text-black-400 font-medium">
                MOVES
              </p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {moves}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
