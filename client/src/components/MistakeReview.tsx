import { useMotionGame } from '@/lib/stores/useMotionGame';
import { puzzleLevels } from '@/data/puzzleLevels';
import { isPathClear, findOptimalPath } from '@/utils/pathfinding';
import { X, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export function MistakeReview() {
  const { levelAttempts, toggleMistakeReview } = useMotionGame();

  const incorrectAttempts = levelAttempts.filter(a => !a.isCorrect);
  
  const exceededTargetAttempts = levelAttempts.filter(a => {
    if (!a.isCorrect) return false;
    const level = puzzleLevels.find(l => l.id === a.levelId);
    return level && a.moves > level.minMoves;
  });

  const allReviewableAttempts = [...incorrectAttempts, ...exceededTargetAttempts];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Review & Improve
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {incorrectAttempts.length} incomplete, {exceededTargetAttempts.length} exceeded target moves
            </p>
          </div>
          <button
            onClick={toggleMistakeReview}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {allReviewableAttempts.map((attempt, index) => {
            const level = puzzleLevels.find(l => l.id === attempt.levelId);
            if (!level) return null;

            const isIncomplete = !attempt.isCorrect;
            const exceededMoves = attempt.isCorrect && attempt.moves > level.minMoves;

            const gridState = {
              rows: level.gridRows,
              cols: level.gridCols,
              blocks: attempt.userBlocks || level.blocks,
            };

            const optimalPath = findOptimalPath(
              { rows: level.gridRows, cols: level.gridCols, blocks: level.blocks },
              level.ballStart,
              level.ballEnd
            );

            const blockedCells = new Set<string>();
            (attempt.userBlocks || level.blocks).forEach(block => {
              for (let r = block.row; r < block.row + block.height; r++) {
                for (let c = block.col; c < block.col + block.width; c++) {
                  blockedCells.add(`${r},${c}`);
                }
              }
            });

            let blockingReason = '';
            if (isIncomplete && attempt.userBlocks) {
              const criticalBlocks = attempt.userBlocks.filter(block => {
                for (let r = block.row; r < block.row + block.height; r++) {
                  for (let c = block.col; c < block.col + block.width; c++) {
                    for (const step of optimalPath) {
                      if (step.row === r && step.col === c) {
                        return true;
                      }
                    }
                  }
                }
                return false;
              });

              if (criticalBlocks.length > 0) {
                const colors = criticalBlocks.map(b => {
                  const colorMap: { [key: string]: string } = {
                    '#FF9800': 'orange',
                    '#2196F3': 'blue',
                    '#4CAF50': 'green',
                    '#9C27B0': 'purple',
                    '#BDBDBD': 'gray',
                  };
                  return colorMap[b.color] || 'colored';
                }).filter((v, i, a) => a.indexOf(v) === i);

                blockingReason = `The ${colors.join(', ')} block${colors.length > 1 ? 's are' : ' is'} blocking the optimal path.`;
              } else {
                blockingReason = 'Multiple blocks created an indirect blockage preventing any path to the target.';
              }
            }

            return (
              <div
                key={`${attempt.levelId}-${index}`}
                className={`rounded-xl p-6 border-2 ${
                  isIncomplete
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-red-200 dark:border-red-800'
                    : 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border-yellow-200 dark:border-yellow-800'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle className={`w-8 h-8 flex-shrink-0 mt-1 ${
                    isIncomplete ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                  }`} />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Level {level.id} ({level.gridRows}×{level.gridCols} Grid)
                    </h3>
                    {isIncomplete ? (
                      <>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          <strong>Problem:</strong> No clear path was found from the Start (green) to the End (red) position.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          <strong>What went wrong:</strong> {blockingReason}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          <strong>Issue:</strong> You completed this level but used <span className="font-bold text-yellow-700 dark:text-yellow-300">{attempt.moves} moves</span> instead of the optimal <span className="font-bold text-green-700 dark:text-green-300">{level.minMoves} moves</span>.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          <strong>Room for improvement:</strong> Study the optimal solution to find a more efficient path.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-600" />
                      Your Attempt
                    </h4>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                      <div className="text-sm space-y-1 mb-3">
                        <p className="text-gray-600 dark:text-gray-400">
                          Grid: {level.gridRows} × {level.gridCols}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Moves used: <span className="font-bold text-red-600">{attempt.moves}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Time: {Math.floor(attempt.timeTaken / 60)}m {attempt.timeTaken % 60}s
                        </p>
                      </div>
                      <MiniGrid
                        level={level}
                        blocks={attempt.userBlocks || level.blocks}
                        highlightBlocked={true}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Optimal Solution
                    </h4>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                      <div className="text-sm space-y-1 mb-3">
                        <p className="text-gray-600 dark:text-gray-400">
                          Minimum moves: <span className="font-bold text-green-600">{level.minMoves}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Path length: {optimalPath.length - 1} cells
                        </p>
                      </div>
                      <MiniGrid
                        level={level}
                        blocks={level.blocks}
                        showPath={true}
                        path={optimalPath}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Step-by-Step Solution
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-800 dark:text-blue-300 mt-0.5">1.</span>
                      <p className="text-blue-700 dark:text-blue-300">
                        <strong>Initial Setup:</strong> The ball starts at row {level.ballStart.row}, column {level.ballStart.col} (green position marked "S"). 
                        The goal is to reach row {level.ballEnd.row}, column {level.ballEnd.col} (red position marked "E").
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-800 dark:text-blue-300 mt-0.5">2.</span>
                      <p className="text-blue-700 dark:text-blue-300">
                        <strong>Clear the Path:</strong> Look at the optimal solution grid (right side) where the green-highlighted cells show the correct path. 
                        Any blocks blocking these cells must be moved out of the way.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-800 dark:text-blue-300 mt-0.5">3.</span>
                      <p className="text-blue-700 dark:text-blue-300">
                        <strong>Move Strategy:</strong> {blockingReason} Drag each blocking block away from the path. 
                        Blocks can slide multiple cells in one move - count each cell traveled as one move.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-800 dark:text-blue-300 mt-0.5">4.</span>
                      <p className="text-blue-700 dark:text-blue-300">
                        <strong>Complete the Puzzle:</strong> Once the path is clear (no blocks on green cells), drag the ball from Start (S) to End (E) following the highlighted path. 
                        The optimal solution uses exactly {level.minMoves} total moves.
                      </p>
                    </div>
                    <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900/40 rounded">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>Tip:</strong> Each cell a block or ball moves counts as one move. Planning your block movements carefully helps achieve the minimum move count.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {allReviewableAttempts.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Perfect Score!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You solved all puzzles correctly with optimal moves.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniGrid({
  level,
  blocks,
  highlightBlocked = false,
  showPath = false,
  path = [],
}: {
  level: any;
  blocks: any[];
  highlightBlocked?: boolean;
  showPath?: boolean;
  path?: { row: number; col: number }[];
}) {
  const cellSize = 30;
  const gridWidth = level.gridCols * cellSize;
  const gridHeight = level.gridRows * cellSize;

  const pathCells = new Set(path.map(p => `${p.row},${p.col}`));

  return (
    <div
      className="relative mx-auto border-2 border-gray-300 dark:border-gray-600 rounded"
      style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}
    >
      {Array.from({ length: level.gridRows }).map((_, row) =>
        Array.from({ length: level.gridCols }).map((_, col) => {
          const isPath = pathCells.has(`${row},${col}`);
          return (
            <div
              key={`${row}-${col}`}
              className={`absolute border border-gray-200 dark:border-gray-700 ${
                isPath && showPath ? 'bg-green-200 dark:bg-green-800' : 'bg-white dark:bg-gray-800'
              }`}
              style={{
                left: `${col * cellSize}px`,
                top: `${row * cellSize}px`,
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
            />
          );
        })
      )}

      <div
        className="absolute rounded-full bg-green-500 border-2 border-green-700"
        style={{
          left: `${level.ballStart.col * cellSize + cellSize / 2 - 6}px`,
          top: `${level.ballStart.row * cellSize + cellSize / 2 - 6}px`,
          width: '12px',
          height: '12px',
          zIndex: 5,
        }}
      />

      <div
        className="absolute rounded-full bg-red-500 border-2 border-red-700"
        style={{
          left: `${level.ballEnd.col * cellSize + cellSize / 2 - 6}px`,
          top: `${level.ballEnd.row * cellSize + cellSize / 2 - 6}px`,
          width: '12px',
          height: '12px',
          zIndex: 5,
        }}
      />

      {blocks.map((block) => (
        <div
          key={block.id}
          className="absolute rounded border border-black/20"
          style={{
            left: `${block.col * cellSize}px`,
            top: `${block.row * cellSize}px`,
            width: `${block.width * cellSize}px`,
            height: `${block.height * cellSize}px`,
            backgroundColor: block.color,
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
}
