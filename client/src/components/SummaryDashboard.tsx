import { useMotionGame } from "@/lib/stores/useMotionGame";
import { puzzleLevels } from "@/data/puzzleLevels";
import {
  Trophy,
  Award,
  Clock,
  Target,
  TrendingUp,
  Zap,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export function SummaryDashboard() {
  const { levelAttempts, resetGame, toggleMistakeReview } = useMotionGame();

  const correctAttempts = levelAttempts.filter((a) => a.isCorrect).length;
  const incorrectAttempts = levelAttempts.filter((a) => !a.isCorrect).length;

  const correctLevelAttempts = levelAttempts.filter((a) => a.isCorrect);
  const totalMoves = correctLevelAttempts.reduce((sum, a) => sum + a.moves, 0);
  const totalTime = correctLevelAttempts.reduce(
    (sum, a) => sum + a.timeTaken,
    0,
  );

  const totalOptimalMoves = correctLevelAttempts.reduce((sum, attempt) => {
    const level = puzzleLevels.find((l) => l.id === attempt.levelId);
    return sum + (level?.minMoves || 0);
  }, 0);

  const baseScore = 200;
  const movePenalty = 3;
  const timePenalty = 2;

  const score = correctLevelAttempts.reduce((totalScore, attempt) => {
    const level = puzzleLevels.find((l) => l.id === attempt.levelId);
    if (!level) return totalScore;
    
    const extraMoves = Math.max(0, attempt.moves - level.minMoves);
    const levelScore = Math.max(
      0,
      baseScore - (movePenalty * extraMoves) - (timePenalty * attempt.timeTaken)
    );
    
    return totalScore + levelScore;
  }, 0);

  const maxPossibleScore = correctLevelAttempts.length * baseScore;

  const fastSolutions = levelAttempts.filter((a) => {
    return a.isCorrect && a.timeTaken <= 10;
  }).length;

  const incorrectLevels = levelAttempts.filter((a) => !a.isCorrect);

  const exceededTargetLevels = levelAttempts.filter((a) => {
    if (!a.isCorrect) return false;
    const level = puzzleLevels.find((l) => l.id === a.levelId);
    return level && a.moves > level.minMoves;
  });

  const reviewableLevels = [...incorrectLevels, ...exceededTargetLevels];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Game Complete!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your performance summary across all 20 puzzles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-l border-2 border-green-200 dark:border-green-600">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-100">
                  Total Score
                </h3>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {score}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Out of {maxPossibleScore} points
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-600">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Completion Rate
                </h3>
              </div>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {levelAttempts.length > 0
                  ? ((correctAttempts / puzzleLevels.length) * 100).toFixed(0)
                  : "0"}
                %
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {correctAttempts} of {puzzleLevels.length} levels completed
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
                Time spent across all levels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Moves
                  </span>
                </div>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {totalMoves} / {totalOptimalMoves}
                </span>
              </div>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Speed Wins (Levels completed in under 10 seconds)
                  </span>
                </div>
                <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {fastSolutions}
                </span>
              </div>
            </div>
          </div>

          {reviewableLevels.length > 0 && (
            <div className="mb-8 bg-gradient-to-br from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Review Items
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {incorrectLevels.length > 0 && (
                  <span>
                    {incorrectLevels.length} incomplete level
                    {incorrectLevels.length !== 1 ? "s" : ""}
                  </span>
                )}
                {incorrectLevels.length > 0 &&
                  exceededTargetLevels.length > 0 && <span>, </span>}
                {exceededTargetLevels.length > 0 && (
                  <span>
                    {exceededTargetLevels.length} exceeded target moves
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {incorrectLevels.map((attempt) => (
                  <span
                    key={`incomplete-${attempt.levelId}`}
                    className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full text-sm font-medium"
                  >
                    Level {attempt.levelId} (incomplete)
                  </span>
                ))}
                {exceededTargetLevels.map((attempt) => (
                  <span
                    key={`exceeded-${attempt.levelId}`}
                    className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium"
                  >
                    Level {attempt.levelId} ({attempt.moves}/
                    {
                      puzzleLevels.find((l) => l.id === attempt.levelId)
                        ?.minMoves
                    }
                    )
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            {reviewableLevels.length > 0 && (
              <button
                onClick={toggleMistakeReview}
                className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-600 to-yellow-600 text-white shadow-lg hover:shadow-xl hover:from-orange-700 hover:to-yellow-700 active:scale-95 transition-all flex items-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Review & Improve ({reviewableLevels.length})
              </button>
            )}

            <button
              onClick={resetGame}
              className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all flex items-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
