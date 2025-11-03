import { useMotionGame } from '@/lib/stores/useMotionGame';
import { puzzleLevels } from '@/data/puzzleLevels';
import { isPathClear, findOptimalPath } from '@/utils/pathfinding';
import { X, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export function MistakeReview() {
  const { levelAttempts, toggleMistakeReview } = useMotionGame();

  const incorrectAttempts = levelAttempts.filter(a => !a.isCorrect);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Review Mistakes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Understanding what went wrong helps you improve
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
          {incorrectAttempts.map((attempt, index) => {
            const level = puzzleLevels.find(l => l.id === attempt.levelId);
            if (!level) return null;

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
            if (attempt.userBlocks) {
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
                className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6 border-2 border-red-200 dark:border-red-800"
              >
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Level {level.id} ({level.gridRows}×{level.gridCols} Grid)
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      <strong>Problem:</strong> No clear path was found from the Start (green) to the End (red) position.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      <strong>What went wrong:</strong> {blockingReason}
                    </p>
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
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    How to Solve
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Move the blocking pieces out of the way to create a clear path. Focus on moving pieces that are 
                    directly in the path from Start to End. The optimal solution requires {level.minMoves} moves.
                  </p>
                </div>
              </div>
            );
          })}

          {incorrectAttempts.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Perfect Score!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You solved all puzzles correctly on the first try.
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
