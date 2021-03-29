import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  useEffect(() => {
    // Stop countdown if it reaches 00:00
    // if (minutes === 0 && seconds === 0) {
    //   console.log('Stopping countdown!');
    //   setIsRunning(false);
    // }
    // Check if the app is set to run
    if (isRunning === true) {
      // Set seconds to 59 if they are equal to 0 (after 1 second)
      if (seconds === 0) {
        const timer = setTimeout(() => {
          console.log('This will run after 1 second!')
          setSeconds(59);
          setMinutes(minutes - 1);
        }, 10);
        // Clear setTimeout
        return () => clearTimeout(timer);
      }
      // If app is set to run, execute the setInterval method
      const interval = setInterval(() => {
        console.log('This will run every second!');
        setSeconds(seconds => seconds - 1);
      }, 10);
      // Clear setInterval
      return () => clearInterval(interval);
    }
    // Check if the app is set to not run
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

  const restartTimer = () => {
    console.log("Restart countdown");
    setSeconds(0);
    setMinutes(25);
    // Check what another pomodoros do when the reset button is clicked
    // Do they restart the countdown on click (true), or the countdown should start after clicking Start again (false or remove setIsRunning)?
    // Checked: delete this..
    setIsRunning(true);
  }

  const decrementBreak = () => {
    console.log("Decrement break");
    setBreakLength(breakLength - 1);
  }

  const incrementBreak = () => {
    console.log("Increment break");
    setBreakLength(breakLength + 1);
  }

  const decrementSession = () => {
    console.log("Decrement session");
    setSessionLength(sessionLength - 1);
  }

  const incrementSession = () => {
    console.log("Increment session");
    setSessionLength(sessionLength + 1);
  }

  if (sessionLength <= 0) {
    console.log("Session has reached the minimum length (0)")
    setSessionLength(1);
  }

  if (breakLength <= 0) {
    console.log("Break has reached the minimum length (0)")
    setBreakLength(1);
  }

  if (sessionLength > 60) {
    console.log("Session has reached the maximum length (60)")
    setSessionLength(60);
  }

  if (breakLength > 60) {
    console.log("Break has reached the maximum length (60)")
    setBreakLength(60);
  }

  return (
    <div className="container">
      <div className="pomodoro">
        {/* Break control */}
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <div className="break-controls">
            <div id="break-decrement" onClick={ decrementBreak }>-</div>
            <div id="break-length">{ breakLength }</div>
            <div id="break-increment" onClick={ incrementBreak }>+</div>
          </div>
        </div>
        {/* Session control */}
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <div className="session-controls">
            <div id="session-decrement" onClick={ decrementSession }>-</div>
            <div id="session-length">{ sessionLength }</div>
            <div id="session-increment" onClick={ incrementSession }>+</div>
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
            <div id="reset" onClick={ restartTimer }>Reset</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
