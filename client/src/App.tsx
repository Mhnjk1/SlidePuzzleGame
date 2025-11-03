import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { MotionGame } from './components/MotionGame';
import { useAudio } from './lib/stores/useAudio';
import '@fontsource/inter';

function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    const bgMusic = new Audio('/sounds/background.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const hit = new Audio('/sounds/hit.mp3');
    hit.volume = 0.5;
    setHitSound(hit);

    const success = new Audio('/sounds/success.mp3');
    success.volume = 0.6;
    setSuccessSound(success);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <ThemeProvider>
      <div className="w-full h-full min-h-screen">
        <MotionGame />
      </div>
    </ThemeProvider>
  );
}

export default App;
