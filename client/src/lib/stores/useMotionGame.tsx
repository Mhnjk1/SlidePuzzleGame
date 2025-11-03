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
  isPlaying: boolean;
  isPaused: boolean;
  levelAttempts: LevelAttempt[];
  gameCompleted: boolean;
  showSummary: boolean;
  showMistakeReview: boolean;
  
  setCurrentLevel: (index: number) => void;
  updateBlocks: (blocks: Block[]) => void;
  incrementMoves: () => void;
  setTimer: (time: number) => void;
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
  isPlaying: false,
  isPaused: false,
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
      isPlaying: false,
      isPaused: false,
    });
  },

  updateBlocks: (blocks) => set({ blocks }),

  incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),

  setTimer: (time) => set({ timer: time }),

  startPlaying: () => set({ isPlaying: true, isPaused: false }),

  pauseGame: () => set({ isPaused: true }),

  resumeGame: () => set({ isPaused: false }),

  submitSolution: (isCorrect) => {
    const state = get();
    const level = puzzleLevels[state.currentLevelIndex];
    
    const attempt: LevelAttempt = {
      levelId: level.id,
      moves: state.moves,
      isCorrect,
      timeTaken: 90 - state.timer,
      userBlocks: isCorrect ? undefined : [...state.blocks],
    };

    set((state) => ({
      levelAttempts: [...state.levelAttempts, attempt],
      isPaused: true,
    }));
  },

  nextLevel: () => {
    const state = get();
    if (state.currentLevelIndex < puzzleLevels.length - 1) {
      const nextIndex = state.currentLevelIndex + 1;
      const level = puzzleLevels[nextIndex];
      set({
        currentLevelIndex: nextIndex,
        blocks: [...level.blocks],
        moves: 0,
        timer: 90,
        isPlaying: false,
        isPaused: false,
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
      isPlaying: false,
      isPaused: false,
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
