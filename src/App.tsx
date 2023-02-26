import {
  useState,
  useEffect,
  useRef,
} from 'react';
import reactLogo from './assets/react.svg';
import { HEATER_KIT } from './constants/index';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] =
    useState<boolean>(false);

  const audioRefs = useRef<
    Array<HTMLAudioElement | null>
  >([]);

  const [
    selectedKeyCode,
    setSelectedKeyCode,
  ] = useState<number | null>(null);

  const handleKeyPress = (
    keyCode: number
  ) => {
    setIsPlaying(true);
    const audioElement =
      audioRefs.current[keyCode];

    if (audioElement) {
      audioElement.play();
    }
  };

  const handleKeyDown = (
    // @ts-ignore
    { keyCode }: KeyboardEvent
  ) => {
    handleKeyPress(keyCode);
    setSelectedKeyCode(keyCode);
    setTimeout(() => {
      setSelectedKeyCode(null);
    }, 100);
  };

  useEffect(() => {
    // Add event listener
    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, []);

  const handleEnded =
    (ended: boolean) => () => {
      setIsPlaying(ended);
    };

  return (
    <div className="App">
      <div>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
        <h2>Drum Machine</h2>
      </div>
      <div className="pad-bank">
        {HEATER_KIT.map(
          ({
            keyTrigger,
            keyCode,
            url,
            id,
          }) => (
            <div
              key={id}
              className={`drum-pad ${
                selectedKeyCode === keyCode
                  ? 'drum-pad--active'
                  : ''
              }`}
              onClick={() => {
                handleKeyPress(keyCode);
              }}
            >
              <audio
                ref={(audio) =>
                  (audioRefs.current[
                    keyCode
                  ] = audio)
                }
                src={url}
                onEnded={handleEnded(false)}
              />
              {keyTrigger}
            </div>
          )
        )}
      </div>
      <div className="card">
        <h3>
          {isPlaying
            ? 'Music is playing, let me dance :D'
            : 'Hmm, where the music !?'}
        </h3>
      </div>
    </div>
  );
}

export default App;
