import {
  useState,
  // useEffect,
  useRef,
} from 'react';
import reactLogo from './assets/react.svg';
import { DRUMS } from './constants/index';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] =
    useState<boolean>(false);

  const audioRefs = useRef<
    Array<HTMLAudioElement | null>
  >([]);

  const handlePlay =
    (index: number) => () => {
      setIsPlaying(true);
      const audioElement =
        audioRefs.current[index];

      if (audioElement) {
        audioElement.play();
      }
    };

  const handleEnded =
    (ended: boolean) => () => {
      setIsPlaying(ended);
    };

  // useEffect(() => {
  //   console.log(DRUMS);
  // }, []);

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
        {DRUMS.map(
          ({ keyTrigger, url }, index) => (
            <div
              key={index}
              className="drum-pad"
              onClick={handlePlay(index)}
            >
              <audio
                ref={(audio) =>
                  (audioRefs.current[index] =
                    audio)
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
            : 'Hmm, where the music?'}
        </h3>
      </div>
    </div>
  );
}

export default App;
