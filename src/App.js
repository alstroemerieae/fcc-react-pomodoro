import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning === true) {
      // Set seconds to 59 if they are equal to 0
      if (seconds === 0) {
        const timer = setTimeout(() => {
          console.log('This will run after 1 second!')
          setSeconds(59);
          setMinutes(minutes - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
      const interval = setInterval(() => {
        console.log('This will run every second!');
        setSeconds(seconds => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    else {
      console.log('This will NOT run every second!');
    }
  }, [isRunning, minutes, seconds]);

  const startStopTimer = () => {
    // Every 1000 milliseconds, set seconds to -1
    if (isRunning === false) {
      console.log("Start countdown");
      setIsRunning(true);
    }
    // Stop timer
    else if (isRunning === true) {
      console.log("Pause countdown");
      setIsRunning(false);
    }
  }

  return (
    <div className="container">
      <div className="pomodoro">
        {/* Break control */}
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <div className="break-controls">
            <div id="break-decrement">+</div>
            <div id="break-length">5</div>
            <div id="break-increment">-</div>
          </div>
        </div>
        {/* Session control */}
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <div className="session-controls">
            <div id="session-decrement">+</div>
            <div id="session-length">25</div>
            <div id="session-increment">-</div>
          </div>
        </div>
        {/* Timer display */}
        <div className="timer">
          <div id="timer-label">Session</div>
          <div id="time-left">
            <div id="minutes">{ minutes }</div>
            <div id="divider">:</div>
            <div id="seconds">{ seconds }</div>
          </div>
          <div className="timer-controls">
            <div id="start_stop" onClick={ startStopTimer }>Start/Stop</div>
            <div id="reset">Reset</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
