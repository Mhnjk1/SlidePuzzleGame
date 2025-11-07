import { create } from 'zustand';
import { Block, PuzzleLevel, puzzleLevels } from '@/data/puzzleLevels';

interface LevelAttempt {
  levelId: number;
  moves: number;
  isCorrect: boolean;
  timeTaken: number;
  userBlocks?: Block[];
}

interface MotionGameState {
  currentLevelIndex: number;
  blocks: Block[];
  moves: number;
  timer: number;
  levelTimer: number;
  globalTimer: number;
  levelStartTime: number;
  totalTimeSpent: number;
  ballRow: number;
  ballCol: number;
  isPlaying: boolean;
  isPaused: boolean;
  isTransitioning: boolean;
  levelAttempts: LevelAttempt[];
  gameCompleted: boolean;
  showSummary: boolean;
  showMistakeReview: boolean;

  
  setCurrentLevel: (index: number) => void;
  updateBlocks: (blocks: Block[]) => void;
  incrementMoves: () => void;
  setTimer: (time: number) => void;
  decrementLevelTimer: () => void;
  decrementGlobalTimer: () => void;
  moveBall: (row: number, col: number) => void;
  checkWinCondition: () => boolean;
  startPlaying: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  submitSolution: (isCorrect: boolean) => void;
  nextLevel: () => void;
  restartLevel: () => void;
  resetGame: () => void;
  completeGame: () => void;
  showSummaryDashboard: () => void;
  toggleMistakeReview: () => void;
  getCurrentLevel: () => PuzzleLevel;
}

export const useMotionGame = create<MotionGameState>((set, get) => ({
  currentLevelIndex: 0,
  blocks: [...puzzleLevels[0].blocks],
  moves: 0,
  timer: 90,
  levelTimer: 90,
  globalTimer: 1800,
  levelStartTime: 90,
  totalTimeSpent: 0,
  ballRow: puzzleLevels[0].ballStart.row,
  ballCol: puzzleLevels[0].ballStart.col,
  isPlaying: false,
  isPaused: false,
  isTransitioning: false,
  levelAttempts: [],
  gameCompleted: false,
  showSummary: false,
  showMistakeReview: false,

  setCurrentLevel: (index) => {
    const level = puzzleLevels[index];
    set({
      currentLevelIndex: index,
      blocks: [...level.blocks],
      moves: 0,
      timer: 90,
      levelTimer: 90,
      levelStartTime: 90,
      ballRow: level.ballStart.row,
      ballCol: level.ballStart.col,
      isPlaying: false,
      isPaused: false,
    });
  },

  updateBlocks: (blocks) => set({ blocks }),

  incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),

  setTimer: (time) => set({ timer: time }),

  decrementLevelTimer: () => {
    const state = get();
    if (!state.isPlaying || state.gameCompleted || state.isTransitioning) return;
    
    const newTime = state.levelTimer - 1;
    set({ levelTimer: Math.max(0, newTime) });
    
    if (newTime <= 0) {
      get().nextLevel();
    }
  },

  decrementGlobalTimer: () => {
    const state = get();
    if (!state.isPlaying || state.gameCompleted) return;
    
    const newTime = state.globalTimer - 1;
    set({ globalTimer: Math.max(0, newTime) });
    
    if (newTime <= 0) {
      get().completeGame();
    }
  },

  moveBall: (row, col) => {
    set({ ballRow: row, ballCol: col });
  },

  checkWinCondition: () => {
    const state = get();
    const level = puzzleLevels[state.currentLevelIndex];
    return state.ballRow === level.ballEnd.row && state.ballCol === level.ballEnd.col;
  },

  startPlaying: () => set({ isPlaying: true, isPaused: false }),

  pauseGame: () => set({ isPaused: true }),

  resumeGame: () => set({ isPaused: false }),

  submitSolution: (isCorrect) => {
    const state = get();
    const level = puzzleLevels[state.currentLevelIndex];
    
    const timeSpentOnLevel = state.levelStartTime - state.levelTimer;
    
    const attempt: LevelAttempt = {
      levelId: level.id,
      moves: state.moves,
      isCorrect,
      timeTaken: timeSpentOnLevel,
      userBlocks: isCorrect ? undefined : [...state.blocks],
    };

    set((state) => ({
      levelAttempts: [...state.levelAttempts, attempt],
      totalTimeSpent: state.totalTimeSpent + timeSpentOnLevel,
      isPaused: true,
    }));
  },

  nextLevel: () => {
    const state = get();
    if (state.isTransitioning || state.gameCompleted) return;
    
    set({ isTransitioning: true });
    
    const isCorrect = get().checkWinCondition();
    get().submitSolution(isCorrect);
    
    if (state.currentLevelIndex < puzzleLevels.length - 1) {
      const nextIndex = state.currentLevelIndex + 1;
      const level = puzzleLevels[nextIndex];
      set({
        currentLevelIndex: nextIndex,
        blocks: [...level.blocks],
        moves: 0,
        timer: 90,
        levelTimer: 90,
        levelStartTime: 90,
        ballRow: level.ballStart.row,
        ballCol: level.ballStart.col,
        isPlaying: true,
        isPaused: false,
        isTransitioning: false,
      });
    } else {
      get().completeGame();
    }
  },

  restartLevel: () => {
    const state = get();
    const level = puzzleLevels[state.currentLevelIndex];
    set({
      blocks: [...level.blocks],
      moves: 0,
      timer: 90,
      levelTimer: 90,
      levelStartTime: 90,
      ballRow: level.ballStart.row,
      ballCol: level.ballStart.col,
      isPlaying: false,
      isPaused: false,
    });
  },

  resetGame: () => {
    const level = puzzleLevels[0];
    set({
      currentLevelIndex: 0,
      blocks: [...level.blocks],
      moves: 0,
      timer: 90,
      levelTimer: 90,
      globalTimer: 1800,
      levelStartTime: 90,
      totalTimeSpent: 0,
      ballRow: level.ballStart.row,
      ballCol: level.ballStart.col,
      isPlaying: false,
      isPaused: false,
      isTransitioning: false,
      levelAttempts: [],
      gameCompleted: false,
      showSummary: false,
      showMistakeReview: false,
    });
  },

  completeGame: () => {
    set({
      gameCompleted: true,
      isPlaying: false,
      showSummary: true,
    });
  },

  showSummaryDashboard: () => {
    set({ showSummary: true });
  },

  toggleMistakeReview: () => {
    set((state) => ({ showMistakeReview: !state.showMistakeReview }));
  },

  getCurrentLevel: () => {
    const state = get();
    return puzzleLevels[state.currentLevelIndex];
  },
}));
