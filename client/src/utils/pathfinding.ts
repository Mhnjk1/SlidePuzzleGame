import { Block } from '../data/puzzleLevels';

export interface GridState {
  rows: number;
  cols: number;
  blocks: Block[];
}

export function isPathClear(
  gridState: GridState,
  start: { row: number; col: number },
  end: { row: number; col: number }
): { isReachable: boolean; path: { row: number; col: number }[] } {
  const { rows, cols, blocks } = gridState;
  
  const occupiedCells = new Set<string>();
  blocks.forEach(block => {
    for (let r = block.row; r < block.row + block.height; r++) {
      for (let c = block.col; c < block.col + block.width; c++) {
        occupiedCells.add(`${r},${c}`);
      }
    }
  });

  const queue: { row: number; col: number; path: { row: number; col: number }[] }[] = [
    { row: start.row, col: start.col, path: [start] }
  ];
  const visited = new Set<string>();
  visited.add(`${start.row},${start.col}`);

  const directions = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 }
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.row === end.row && current.col === end.col) {
      return { isReachable: true, path: current.path };
    }

    for (const dir of directions) {
      const newRow = current.row + dir.dr;
      const newCol = current.col + dir.dc;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !occupiedCells.has(`${newRow},${newCol}`) &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        visited.add(`${newRow},${newCol}`);
        queue.push({
          row: newRow,
          col: newCol,
          path: [...current.path, { row: newRow, col: newCol }]
        });
      }
    }
  }

  return { isReachable: false, path: [] };
}

export function checkCollision(
  block: Block,
  newRow: number,
  newCol: number,
  allBlocks: Block[],
  gridRows: number,
  gridCols: number
): boolean {
  if (newRow < 0 || newCol < 0) return true;
  if (newRow + block.height > gridRows || newCol + block.width > gridCols) return true;

  const otherBlocks = allBlocks.filter(b => b.id !== block.id);
  
  for (const other of otherBlocks) {
    if (
      newRow < other.row + other.height &&
      newRow + block.height > other.row &&
      newCol < other.col + other.width &&
      newCol + block.width > other.col
    ) {
      return true;
    }
  }

  return false;
}

export function findOptimalPath(
  gridState: GridState,
  start: { row: number; col: number },
  end: { row: number; col: number }
): { row: number; col: number }[] {
  const result = isPathClear(gridState, start, end);
  return result.path;
}
