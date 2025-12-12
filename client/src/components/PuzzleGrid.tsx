import { useEffect, useRef, useState } from "react";
import { Block as BlockType } from "@/data/puzzleLevels";
import { checkCollision } from "@/utils/pathfinding";
import { useMotionGame } from "@/lib/stores/useMotionGame";

interface DraggableBlockProps {
  block: BlockType;
  cellSize: number;
  gridRows: number;
  gridCols: number;
  allBlocks: BlockType[];
  onMove: (blockId: string, newRow: number, newCol: number) => void;
}

function DraggableBlock({
  block,
  cellSize,
  gridRows,
  gridCols,
  allBlocks,
  onMove,
}: DraggableBlockProps) {
  const store = useMotionGame;
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

      if (block.orientation === "horizontal") {
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

      const { ballRow, ballCol } = store.getState();
      
      if (
        !checkCollision(
          block,
          position.row,
          position.col,
          allBlocks,
          gridRows,
          gridCols,
          ballRow,
          ballCol,
        )
      ) {
        if (position.row !== block.row || position.col !== block.col) {
          onMove(block.id, position.row, position.col);
        }
      } else {
        setPosition({ row: block.row, col: block.col });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [
    isDragging,
    position,
    dragOffset,
    block,
    allBlocks,
    gridRows,
    gridCols,
    cellSize,
    onMove,
    store,
  ]);

  const style: React.CSSProperties = {
    position: "absolute",
    left: `${position.col * cellSize}px`,
    top: `${position.row * cellSize}px`,
    width: `${block.width * cellSize}px`,
    height: `${block.height * cellSize}px`,
    backgroundColor: block.color,
    border: "2px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    cursor: block.movable ? "grab" : "default",
    transition: isDragging ? "none" : "transform 0.2s ease-out",
    zIndex: isDragging ? 1000 : 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    userSelect: "none",
    touchAction: "none",
  };

  if (isDragging) {
    style.cursor = "grabbing";
    style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
  }

  return (
    <div
      ref={blockRef}
      style={style}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {block.movable && "≡"}
    </div>
  );
}

interface DraggableBallProps {
  cellSize: number;
  gridRows: number;
  gridCols: number;
  allBlocks: BlockType[];
}

function DraggableBall({
  cellSize,
  gridRows,
  gridCols,
  allBlocks,
}: DraggableBallProps) {
  const {
    ballRow,
    ballCol,
    moveBall,
    checkWinCondition,
    nextLevel,
    getCurrentLevel,
    gameCompleted,
    incrementMoves,
  } = useMotionGame();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ row: ballRow, col: ballCol });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragDirection, setDragDirection] = useState<
    "horizontal" | "vertical" | null
  >(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const winTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentLevelIdRef = useRef(getCurrentLevel().id);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ row: ballRow, col: ballCol });

    const currentLevelId = getCurrentLevel().id;
    if (currentLevelId !== currentLevelIdRef.current || gameCompleted) {
      if (winTimeoutRef.current) {
        clearTimeout(winTimeoutRef.current);
        winTimeoutRef.current = null;
      }
      currentLevelIdRef.current = currentLevelId;
    }
  }, [ballRow, ballCol, getCurrentLevel, gameCompleted]);

  const isCellOccupied = (row: number, col: number): boolean => {
    return allBlocks.some((block) => {
      return (
        row >= block.row &&
        row < block.row + block.height &&
        col >= block.col &&
        col < block.col + block.width
      );
    });
  };

  const findValidPosition = (
    targetRow: number,
    targetCol: number,
    direction: "horizontal" | "vertical",
  ): { row: number; col: number } => {
    if (direction === "horizontal") {
      const step = targetCol > ballCol ? 1 : -1;
      let validCol = ballCol;

      for (
        let col = ballCol + step;
        step > 0 ? col <= targetCol : col >= targetCol;
        col += step
      ) {
        if (col < 0 || col >= gridCols || isCellOccupied(ballRow, col)) {
          break;
        }
        validCol = col;
      }

      return { row: ballRow, col: validCol };
    } else {
      const step = targetRow > ballRow ? 1 : -1;
      let validRow = ballRow;

      for (
        let row = ballRow + step;
        step > 0 ? row <= targetRow : row >= targetRow;
        row += step
      ) {
        if (row < 0 || row >= gridRows || isCellOccupied(row, ballCol)) {
          break;
        }
        validRow = row;
      }

      return { row: validRow, col: ballCol };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragDirection(null);
    const rect = ballRef.current!.getBoundingClientRect();
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragDirection(null);
    const touch = e.touches[0];
    const rect = ballRef.current!.getBoundingClientRect();
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const gridElement = ballRef.current?.parentElement;
    if (!gridElement) return;

    const handleMove = (clientX: number, clientY: number) => {
      const deltaX = clientX - startPosRef.current.x;
      const deltaY = clientY - startPosRef.current.y;

      if (!dragDirection && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          setDragDirection("horizontal");
        } else {
          setDragDirection("vertical");
        }
      }

      if (!dragDirection) return;

      const gridRect = gridElement.getBoundingClientRect();
      const x = clientX - gridRect.left - dragOffset.x;
      const y = clientY - gridRect.top - dragOffset.y;

      const col = Math.round((x - cellSize / 2 + 15) / cellSize);
      const row = Math.round((y - cellSize / 2 + 15) / cellSize);

      let targetRow = ballRow;
      let targetCol = ballCol;

      if (dragDirection === "horizontal") {
        targetCol = Math.max(0, Math.min(gridCols - 1, col));
        targetRow = ballRow;
      } else if (dragDirection === "vertical") {
        targetRow = Math.max(0, Math.min(gridRows - 1, row));
        targetCol = ballCol;
      }

      const validPosition = findValidPosition(
        targetRow,
        targetCol,
        dragDirection,
      );
      setPosition(validPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
      setDragDirection(null);

      if (position.row !== ballRow || position.col !== ballCol) {
        if (!isCellOccupied(position.row, position.col)) {
          const cellsMoved =
            Math.abs(position.row - ballRow) + Math.abs(position.col - ballCol);

          for (let i = 0; i < cellsMoved; i++) {
            incrementMoves();
          }

          const currentLevelId = getCurrentLevel().id;
          moveBall(position.row, position.col);

          if (winTimeoutRef.current) {
            clearTimeout(winTimeoutRef.current);
          }

          winTimeoutRef.current = setTimeout(() => {
            if (
              !gameCompleted &&
              checkWinCondition() &&
              getCurrentLevel().id === currentLevelId
            ) {
              nextLevel();
            }
            winTimeoutRef.current = null;
          }, 300);
        } else {
          setPosition({ row: ballRow, col: ballCol });
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [
    isDragging,
    position,
    dragOffset,
    dragDirection,
    ballRow,
    ballCol,
    gridRows,
    gridCols,
    cellSize,
    moveBall,
    checkWinCondition,
    nextLevel,
    getCurrentLevel,
    gameCompleted,
    incrementMoves,
  ]);

  return (
    <div
      ref={ballRef}
      className="absolute rounded-full bg-yellow-400 border-4 border-yellow-600 shadow-lg"
      style={{
        left: `${position.col * cellSize + cellSize / 2 - 15}px`,
        top: `${position.row * cellSize + cellSize / 2 - 15}px`,
        width: "30px",
        height: "30px",
        zIndex: isDragging ? 2000 : 500,
        cursor: "grab",
        transition: isDragging ? "none" : "all 0.2s ease-out",
        boxShadow: isDragging ? "0 8px 16px rgba(0, 0, 0, 0.3)" : undefined,
        userSelect: "none",
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    />
  );
}

export function PuzzleGrid() {
  const { blocks, updateBlocks, incrementMoves, getCurrentLevel } =
    useMotionGame();
  const level = getCurrentLevel();
  const gridRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(60);

  useEffect(() => {
    const updateCellSize = () => {
      if (!gridRef.current) return;

      const container = gridRef.current.parentElement;
      if (!container) return;

      const maxWidth = container.clientWidth - 40;
      const maxHeight = container.clientHeight - 40;

      const cellWidth = Math.floor(maxWidth / level.gridCols);
      const cellHeight = Math.floor(maxHeight / level.gridRows);

      setCellSize(Math.min(cellWidth, cellHeight, 70));
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [level.gridCols, level.gridRows]);

  const handleBlockMove = (blockId: string, newRow: number, newCol: number) => {
    const movedBlock = blocks.find((b) => b.id === blockId);
    if (!movedBlock) return;

    const cellsMoved =
      Math.abs(newRow - movedBlock.row) + Math.abs(newCol - movedBlock.col);

    const updatedBlocks = blocks.map((b) =>
      b.id === blockId ? { ...b, row: newRow, col: newCol } : b,
    );
    updateBlocks(updatedBlocks);

    for (let i = 0; i < cellsMoved; i++) {
      incrementMoves();
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
        border: "3px solid #e0e0e0",
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
        )),
      )}

      <div
        className="absolute rounded-full bg-green-500 border-4 border-green-700 shadow-lg flex items-center justify-center text-white font-bold text-xs"
        style={{
          left: `${level.ballStart.col * cellSize + cellSize / 2 - 15}px`,
          top: `${level.ballStart.row * cellSize + cellSize / 2 - 15}px`,
          width: "30px",
          height: "30px",
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
          width: "30px",
          height: "30px",
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

      <DraggableBall
        cellSize={cellSize}
        gridRows={level.gridRows}
        gridCols={level.gridCols}
        allBlocks={blocks}
      />
    </div>
  );
}
