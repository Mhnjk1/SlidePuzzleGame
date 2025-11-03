export interface Block {
  id: string;
  row: number;
  col: number;
  width: number;
  height: number;
  color: string;
  orientation: 'horizontal' | 'vertical';
  movable: boolean;
}

export interface PuzzleLevel {
  id: number;
  gridRows: number;
  gridCols: number;
  blocks: Block[];
  ballStart: { row: number; col: number };
  ballEnd: { row: number; col: number };
  minMoves: number;
  title: string;
}

export const puzzleLevels: PuzzleLevel[] = [
  {
    id: 1,
    gridRows: 4,
    gridCols: 4,
    title: "Beginner Level 1",
    minMoves: 6,
    ballStart: { row: 3, col: 0 },
    ballEnd: { row: 0, col: 3 },
    blocks: [
      { id: 'orange1', row: 0, col: 0, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 1, col: 1, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 2, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 2, col: 3, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 1, col: 1, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 2, col: 2, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 2,
    gridRows: 5,
    gridCols: 3,
    title: "Beginner Level 2",
    minMoves: 5,
    ballStart: { row: 4, col: 0 },
    ballEnd: { row: 0, col: 2 },
    blocks: [
      { id: 'orange1', row: 0, col: 0, width: 1, height: 2, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 1, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 1, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'gray1', row: 3, col: 2, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 3,
    gridRows: 4,
    gridCols: 7,
    title: "Intermediate Level 1",
    minMoves: 8,
    ballStart: { row: 3, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 1, col: 3, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 1, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 2, col: 2, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 1, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 4,
    gridRows: 6,
    gridCols: 6,
    title: "Intermediate Level 2",
    minMoves: 10,
    ballStart: { row: 5, col: 0 },
    ballEnd: { row: 0, col: 5 },
    blocks: [
      { id: 'orange1', row: 0, col: 1, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 2, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 3, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 4, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 2, col: 3, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 4, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 5,
    gridRows: 6,
    gridCols: 7,
    title: "Advanced Level 1",
    minMoves: 12,
    ballStart: { row: 5, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 0, col: 2, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 3, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 1, col: 0, width: 1, height: 2, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 1, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 4, col: 4, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 6,
    gridRows: 7,
    gridCols: 6,
    title: "Advanced Level 2",
    minMoves: 13,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 5 },
    blocks: [
      { id: 'orange1', row: 1, col: 1, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 2, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 3, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 4, col: 4, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 0, col: 0, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 3, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 7,
    gridRows: 7,
    gridCols: 7,
    title: "Expert Level 1",
    minMoves: 15,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 1, col: 2, width: 1, height: 5, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 3, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 4, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 1, col: 0, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 4, col: 1, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 4, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray3', row: 2, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 8,
    gridRows: 5,
    gridCols: 5,
    title: "Intermediate Level 3",
    minMoves: 9,
    ballStart: { row: 4, col: 0 },
    ballEnd: { row: 0, col: 4 },
    blocks: [
      { id: 'orange1', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 2, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 3, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 3, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 2, col: 3, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 9,
    gridRows: 6,
    gridCols: 6,
    title: "Intermediate Level 4",
    minMoves: 11,
    ballStart: { row: 5, col: 0 },
    ballEnd: { row: 0, col: 5 },
    blocks: [
      { id: 'orange1', row: 0, col: 2, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 3, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 4, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 1, col: 1, width: 1, height: 2, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 2, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 4, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 10,
    gridRows: 4,
    gridCols: 6,
    title: "Intermediate Level 5",
    minMoves: 8,
    ballStart: { row: 3, col: 0 },
    ballEnd: { row: 0, col: 5 },
    blocks: [
      { id: 'orange1', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 1, col: 3, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 2, col: 2, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 1, col: 4, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 11,
    gridRows: 7,
    gridCols: 6,
    title: "Advanced Level 3",
    minMoves: 14,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 5 },
    blocks: [
      { id: 'orange1', row: 1, col: 1, width: 1, height: 5, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 3, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 4, col: 4, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 0, col: 2, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 2, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 12,
    gridRows: 6,
    gridCols: 7,
    title: "Advanced Level 4",
    minMoves: 13,
    ballStart: { row: 5, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 0, col: 2, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 4, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 1, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 3, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 4, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 13,
    gridRows: 7,
    gridCols: 7,
    title: "Expert Level 2",
    minMoves: 16,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 1, col: 2, width: 1, height: 5, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 4, width: 1, height: 4, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 4, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 1, col: 3, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 4, col: 1, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray3', row: 2, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 14,
    gridRows: 5,
    gridCols: 5,
    title: "Intermediate Level 6",
    minMoves: 10,
    ballStart: { row: 4, col: 0 },
    ballEnd: { row: 0, col: 4 },
    blocks: [
      { id: 'orange1', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 2, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 3, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 3, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 2, col: 3, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 1, col: 0, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 15,
    gridRows: 6,
    gridCols: 6,
    title: "Advanced Level 5",
    minMoves: 12,
    ballStart: { row: 5, col: 0 },
    ballEnd: { row: 0, col: 5 },
    blocks: [
      { id: 'orange1', row: 0, col: 2, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 3, width: 1, height: 4, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 4, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 1, col: 1, width: 1, height: 2, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 2, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray3', row: 0, col: 0, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 16,
    gridRows: 7,
    gridCols: 7,
    title: "Expert Level 3",
    minMoves: 17,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 1, col: 2, width: 1, height: 5, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 4, width: 1, height: 4, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 4, col: 5, width: 1, height: 3, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 1, col: 3, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green2', row: 0, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'gray1', row: 4, col: 1, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray3', row: 2, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 17,
    gridRows: 6,
    gridCols: 7,
    title: "Advanced Level 6",
    minMoves: 14,
    ballStart: { row: 5, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 0, col: 2, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 2, col: 4, width: 1, height: 4, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 1, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 3, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 1, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 0, col: 3, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 3, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 18,
    gridRows: 7,
    gridCols: 6,
    title: "Expert Level 4",
    minMoves: 15,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 5 },
    blocks: [
      { id: 'orange1', row: 1, col: 1, width: 1, height: 5, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 3, width: 1, height: 4, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 4, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 4, col: 4, width: 1, height: 3, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 0, col: 2, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 0, col: 0, width: 1, height: 2, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 3, col: 2, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 6, col: 5, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 19,
    gridRows: 7,
    gridCols: 7,
    title: "Expert Level 5",
    minMoves: 18,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 1, col: 2, width: 1, height: 5, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 4, width: 1, height: 4, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 5, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 0, col: 1, width: 1, height: 3, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 1, col: 3, width: 1, height: 2, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green2', row: 0, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple2', row: 4, col: 0, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 4, col: 1, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 5, col: 4, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray3', row: 3, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  },
  {
    id: 20,
    gridRows: 7,
    gridCols: 7,
    title: "Master Level",
    minMoves: 20,
    ballStart: { row: 6, col: 0 },
    ballEnd: { row: 0, col: 6 },
    blocks: [
      { id: 'orange1', row: 1, col: 2, width: 1, height: 6, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue1', row: 3, col: 4, width: 1, height: 4, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green1', row: 2, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple1', row: 5, col: 5, width: 1, height: 2, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange2', row: 0, col: 1, width: 1, height: 4, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'blue2', row: 1, col: 3, width: 1, height: 3, color: '#2196F3', orientation: 'vertical', movable: true },
      { id: 'green2', row: 0, col: 5, width: 2, height: 1, color: '#4CAF50', orientation: 'horizontal', movable: true },
      { id: 'purple2', row: 4, col: 0, width: 1, height: 3, color: '#9C27B0', orientation: 'vertical', movable: true },
      { id: 'orange3', row: 5, col: 1, width: 1, height: 2, color: '#FF9800', orientation: 'vertical', movable: true },
      { id: 'gray1', row: 4, col: 1, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray2', row: 6, col: 4, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray3', row: 3, col: 6, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
      { id: 'gray4', row: 1, col: 0, width: 1, height: 1, color: '#BDBDBD', orientation: 'horizontal', movable: false },
    ]
  }
];
