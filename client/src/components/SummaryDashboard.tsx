import { useMotionGame } from '@/lib/stores/useMotionGame';
import { puzzleLevels } from '@/data/puzzleLevels';
import { Trophy, Award, Clock, Target } from 'lucide-react';

export function SummaryDashboard() {
  const { levelAttempts, resetGame, toggleMistakeReview } = useMotionGame();

  const correctAttempts = levelAttempts.filter(a => a.isCorrect).length;
  const incorrectAttempts = levelAttempts.filter(a => !a.isCorrect).length;
  const totalMoves = levelAttempts.reduce((sum, a) => sum + a.moves, 0);
  const averageMoves = levelAttempts.length > 0 ? (totalMoves / levelAttempts.length).toFixed(1) : '0';
  const totalTime = levelAttempts.reduce((sum, a) => sum + a.timeTaken, 0);

  const score = levelAttempts.reduce((total, attempt) => {
    if (!attempt.isCorrect) return total;
    
    const level = puzzleLevels.find(l => l.id === attempt.levelId);
    if (!level) return total;

    const efficiency = level.minMoves / attempt.moves;
    const timeBonus = attempt.timeTaken < 30 ? 1.2 : attempt.timeTaken < 60 ? 1.1 : 1.0;
    const points = Math.round(efficiency * 100 * timeBonus);
    
    return total + points;
  }, 0);

  const incorrectLevels = levelAttempts.filter(a => !a.isCorrect);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Game Complete!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's how you performed across all 20 puzzles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Total Score
                </h3>
              </div>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {score}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Based on efficiency & speed
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Accuracy
                </h3>
              </div>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {((correctAttempts / levelAttempts.length) * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {correctAttempts} correct, {incorrectAttempts} incorrect
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Total Time
                </h3>
              </div>
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                {formatTime(totalTime)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Average: {formatTime(Math.round(totalTime / levelAttempts.length))}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {incorrectLevels.length > 0 && (
              <button
                onClick={toggleMistakeReview}
                className="px-8 py-3 rounded-lg font-semibold bg-red-600 text-white shadow-lg hover:bg-red-700 active:scale-95 transition-all"
              >
                Review Mistakes ({incorrectLevels.length})
              </button>
            )}
            
            <button
              onClick={resetGame}
              className="px-8 py-3 rounded-lg font-semibold bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
