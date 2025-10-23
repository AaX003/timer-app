import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(Math.floor(Math.random() * 1000000));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      })
    }, 1000)
      return () => clearInterval(interval);
  }, [paused]);

  const prev = useRef(time);

  const pauseTime = () => {
    setPaused(true);
  }

  const resumeTime = () => {
    setPaused(false);
  }

  const resetTime = () => {
    setTime(prev.current);
    setPaused(false);
  }

  const days = Math.floor(time / 86400); 
  const hours = Math.floor((time % 86400) / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;

  const format = (t) => String(t).padStart(2, "0");

  return (
    <div className="container">
      <section className="time-container">
        <header className="timer-text">
          <small className="text">
            Days | Hours | Mins | Secs
          </small>
        </header>
        <h1 className="time">
         <span className="days">{format(days)}</span>:<span className="hours">{format(hours)}</span>:<span className="mins">{format(mins)}</span>:<span className="secs">{format(secs)}</span>
        </h1>
      </section>
      <section className="action-btns-container">
        <button className={paused ? "resume" : "paused"} onClick={paused ? resumeTime : pauseTime} disabled={time === 0}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button className="reset" onClick={resetTime}>
          Reset
        </button>
      </section>
       <small className="msg">
        Refresh browser to get a new time
      </small>
    </div>
  );
}

export default App;
