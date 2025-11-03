import { useEffect, useRef, useState } from 'react';
import { Block as BlockType } from '@/data/puzzleLevels';
import { checkCollision, isPathClear } from '@/utils/pathfinding';
import { useMotionGame } from '@/lib/stores/useMotionGame';

interface DraggableBlockProps {
  block: BlockType;
  cellSize: number;
  gridRows: number;
  gridCols: number;
  allBlocks: BlockType[];
  onMove: (blockId: string, newRow: number, newCol: number) => void;
}

function DraggableBlock({ block, cellSize, gridRows, gridCols, allBlocks, onMove }: DraggableBlockProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ row: block.row, col: block.col });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition({ row: block.row, col: block.col });
  }, [block.row, block.col]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!block.movable) return;
    
    setIsDragging(true);
    const rect = blockRef.current!.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!block.movable) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = blockRef.current!.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      const gridContainer = blockRef.current?.parentElement;
      if (!gridContainer) return;

      const gridRect = gridContainer.getBoundingClientRect();
      const relativeX = clientX - gridRect.left - dragOffset.x;
      const relativeY = clientY - gridRect.top - dragOffset.y;

      let newCol = Math.round(relativeX / cellSize);
      let newRow = Math.round(relativeY / cellSize);

      if (block.orientation === 'horizontal') {
        newRow = block.row;
      } else {
        newCol = block.col;
      }

      newCol = Math.max(0, Math.min(gridCols - block.width, newCol));
      newRow = Math.max(0, Math.min(gridRows - block.height, newRow));

      setPosition({ row: newRow, col: newCol });
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
      
      if (!checkCollision(block, position.row, position.col, allBlocks, gridRows, gridCols)) {
        if (position.row !== block.row || position.col !== block.col) {
          onMove(block.id, position.row, position.col);
        }
      } else {
        setPosition({ row: block.row, col: block.col });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, position, dragOffset, block, allBlocks, gridRows, gridCols, cellSize, onMove]);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.col * cellSize}px`,
    top: `${position.row * cellSize}px`,
    width: `${block.width * cellSize}px`,
    height: `${block.height * cellSize}px`,
    backgroundColor: block.color,
    border: '2px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    cursor: block.movable ? 'grab' : 'default',
    transition: isDragging ? 'none' : 'transform 0.2s ease-out',
    zIndex: isDragging ? 1000 : 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    userSelect: 'none',
    touchAction: 'none',
  };

  if (isDragging) {
    style.cursor = 'grabbing';
    style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
  }

  return (
    <div
      ref={blockRef}
      style={style}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {block.movable && '≡'}
    </div>
  );
}

interface AnimatedBallProps {
  path: { row: number; col: number }[];
  cellSize: number;
  onComplete: () => void;
}

function AnimatedBall({ path, cellSize, onComplete }: AnimatedBallProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= path.length - 1) {
      setTimeout(onComplete, 500);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, path.length, onComplete]);

  if (path.length === 0) return null;

  const currentPos = path[currentIndex];

  return (
    <div
      className="absolute rounded-full bg-yellow-400 border-4 border-yellow-600 shadow-lg animate-bounce"
      style={{
        left: `${currentPos.col * cellSize + cellSize / 2 - 15}px`,
        top: `${currentPos.row * cellSize + cellSize / 2 - 15}px`,
        width: '30px',
        height: '30px',
        zIndex: 100,
        transition: 'all 0.3s ease-in-out',
      }}
    />
  );
}

export function PuzzleGrid() {
  const { blocks, updateBlocks, incrementMoves, getCurrentLevel } = useMotionGame();
  const level = getCurrentLevel();
  const gridRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(60);
  const [showBallAnimation, setShowBallAnimation] = useState(false);
  const [ballPath, setBallPath] = useState<{ row: number; col: number }[]>([]);

  useEffect(() => {
    const updateCellSize = () => {
      if (!gridRef.current) return;
      
      const container = gridRef.current.parentElement;
      if (!container) return;

      const maxWidth = Math.min(container.clientWidth - 40, 600);
      const maxHeight = Math.min(container.clientHeight - 40, 600);
      
      const cellWidth = Math.floor(maxWidth / level.gridCols);
      const cellHeight = Math.floor(maxHeight / level.gridRows);
      
      setCellSize(Math.min(cellWidth, cellHeight, 80));
    };

    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [level.gridCols, level.gridRows]);

  useEffect(() => {
    setShowBallAnimation(false);
    setBallPath([]);
  }, [level.id]);

  const handleBlockMove = (blockId: string, newRow: number, newCol: number) => {
    const updatedBlocks = blocks.map(b =>
      b.id === blockId ? { ...b, row: newRow, col: newCol } : b
    );
    updateBlocks(updatedBlocks);
    incrementMoves();
    
    const gridState = {
      rows: level.gridRows,
      cols: level.gridCols,
      blocks: updatedBlocks,
    };
    const result = isPathClear(gridState, level.ballStart, level.ballEnd);
    if (result.isReachable) {
      setBallPath(result.path);
      setShowBallAnimation(true);
    } else {
      setShowBallAnimation(false);
      setBallPath([]);
    }
  };

  const gridWidth = level.gridCols * cellSize;
  const gridHeight = level.gridRows * cellSize;

  return (
    <div
      ref={gridRef}
      className="relative mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      style={{
        width: `${gridWidth}px`,
        height: `${gridHeight}px`,
        border: '3px solid #e0e0e0',
      }}
    >
      {Array.from({ length: level.gridRows }).map((_, row) =>
        Array.from({ length: level.gridCols }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute border border-gray-200 dark:border-gray-600"
            style={{
              left: `${col * cellSize}px`,
              top: `${row * cellSize}px`,
              width: `${cellSize}px`,
              height: `${cellSize}px`,
            }}
          />
        ))
      )}

      <div
        className="absolute rounded-full bg-green-500 border-4 border-green-700 shadow-lg flex items-center justify-center text-white font-bold text-xs"
        style={{
          left: `${level.ballStart.col * cellSize + cellSize / 2 - 15}px`,
          top: `${level.ballStart.row * cellSize + cellSize / 2 - 15}px`,
          width: '30px',
          height: '30px',
          zIndex: 5,
        }}
        title="Start - Ball begins here"
      >
        S
      </div>

      <div
        className="absolute rounded-full bg-red-500 border-4 border-red-700 shadow-lg flex items-center justify-center text-white font-bold text-xs"
        style={{
          left: `${level.ballEnd.col * cellSize + cellSize / 2 - 15}px`,
          top: `${level.ballEnd.row * cellSize + cellSize / 2 - 15}px`,
          width: '30px',
          height: '30px',
          zIndex: 5,
        }}
        title="End - Ball must reach here"
      >
        E
      </div>

      {blocks.map((block) => (
        <DraggableBlock
          key={block.id}
          block={block}
          cellSize={cellSize}
          gridRows={level.gridRows}
          gridCols={level.gridCols}
          allBlocks={blocks}
          onMove={handleBlockMove}
        />
      ))}

      {showBallAnimation && ballPath.length > 0 && (
        <AnimatedBall
          path={ballPath}
          cellSize={cellSize}
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
