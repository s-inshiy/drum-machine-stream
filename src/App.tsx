import {
  useState,
  useEffect,
  useRef,
} from 'react';
import reactLogo from './assets/react.svg';
import { DRUMS } from './constants/index';
import './App.css';

function App() {
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] =
    useState(false);

  function handlePlay() {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    console.log(DRUMS);
  }, []);

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
      </div>
      <div className="pad-bank">
        {DRUMS.map(
          ({ keyTrigger, url }, index) => (
            <div
              key={index}
              className="drum-pad"
              onClick={handlePlay}
            >
              <audio
                ref={audioRef}
                src={url}
              ></audio>
              {keyTrigger}
            </div>
          )
        )}
      </div>
      <div className="card">
        <button>Push the Like Button!</button>
        <p>
          Edit <code>src/App.tsx</code> and
          save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
