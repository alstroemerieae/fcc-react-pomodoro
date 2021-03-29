import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [secondsDisplay, setSecondsDisplay] = useState("66")
  const [minutesDisplay, setMinutesDisplay] = useState("77")

  console.log("$$$Current_Values$$$")
  console.log(`Current seconds:${seconds}`);
  console.log(`Current minutes:${minutes}`);
  console.log(`Current running status:${isRunning}`);
  console.log(`Current break length:${breakLength}`);
  console.log(`Current session length:${sessionLength}`);
  console.log(`Current seconds display:${secondsDisplay}`);
  console.log(`Current minutes display:${minutesDisplay}`);

  // Set display to mm:ss format
  // Set **:ss
  if(secondsDisplay === "0") {
    console.log("Adding a 0 to the seconds string")
    setSecondsDisplay("00");
  } else if (secondsDisplay === "1") {
    setSecondsDisplay("01");
  } else if (secondsDisplay === "2") {
    setSecondsDisplay("02");
  } else if (secondsDisplay === "3") {
    setSecondsDisplay("03");
  } else if (secondsDisplay === "4") {
    setSecondsDisplay("04");
  } else if (secondsDisplay === "5") {
    setSecondsDisplay("05");
  } else if (secondsDisplay === "6") {
    setSecondsDisplay("06");
  } else if (secondsDisplay === "7") {
    setSecondsDisplay("07");
  } else if (secondsDisplay === "8") {
    setSecondsDisplay("08");
  } else if (secondsDisplay === "9") {
    setSecondsDisplay("09");
  }
  // Set mm:**
  if(minutesDisplay === "0") {
    console.log("Adding a 0 to the minutes string")
    setMinutesDisplay("00");
  } else if (minutesDisplay === "1") {
    setMinutesDisplay("01");
  } else if (minutesDisplay === "2") {
    setMinutesDisplay("02");
  } else if (minutesDisplay === "3") {
    setMinutesDisplay("03");
  } else if (minutesDisplay === "4") {
    setMinutesDisplay("04");
  } else if (minutesDisplay === "5") {
    setMinutesDisplay("05");
  } else if (minutesDisplay === "6") {
    setMinutesDisplay("06");
  } else if (minutesDisplay === "7") {
    setMinutesDisplay("07");
  } else if (minutesDisplay === "8") {
    setMinutesDisplay("08");
  } else if (minutesDisplay === "9") {
    setMinutesDisplay("09");
  }

  useEffect(() => {
    // Set the minutes and seconds to string
    setSecondsDisplay(seconds.toString());
    setMinutesDisplay(minutes.toString());

    // Stop countdown if it reaches 00:00
    if (minutes === 0 && seconds === 0) {
      console.log('Stopping countdown!');
      setSeconds(0);
      setMinutes(0)
      setIsRunning(false);
    }

    // Check if the app is set to run (isRunning === true)
    if (isRunning === true) {
      // Set seconds to (59) and minutes to (minutes-1) if seconds are equal to (0)
      if (seconds === 0) {
        // Run this after 1 seconds
        // This will prevent a display bug like this:
        // 24:00 (1s)=> 23:00 (1s)=> 23:59
        // And will display this instead:
        // 24:00 (1s)=> 23:59
        const timer = setTimeout(() => {
          console.log('This will run after 1 second!')
          setMinutes(minutes - 1);
          setSeconds(59);
        }, 10);
        return () => clearTimeout(timer);
      }
      // Execute the setInterval method to substract 1 to seconds every second
      const interval = setInterval(() => {
        console.log('This will run every second!');
        setSeconds(seconds => seconds - 1);
      }, 10);
      // Clear setInterval
      return () => clearInterval(interval);
    }
    // Check if the app is set to not run (isRunning === false)
    else {
      console.log('This will NOT run every second!');
    }
  }, [isRunning, minutes, seconds]);

  const startStopTimer = () => {
    // Every 1000 milliseconds, set seconds to -1
    if (isRunning === false) {
      console.log("Start countdown");
      setIsRunning(true);
      if (seconds === 0) {
        console.log("#################")
        setSeconds(59);
        setMinutes(minutes - 1);
      }
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
    setBreakLength(5);
    setSessionLength(25);
    setIsRunning(false);
  }

  const decrementBreak = () => {
    console.log("Decrement break");
    if (breakLength <= 0) {
      console.log("Break has reached the minimum length (0)")
      setBreakLength(1);
    } else {
      console.log(`Break length is ${breakLength}, substracting 1 from it...`)
      setBreakLength(breakLength - 1);
    }
  }

  const incrementBreak = () => {
    console.log("Increment break");
    if (breakLength > 60) {
      console.log("Break has reached the maximum length (60)")
        return;
    } else {
      console.log(`Break length is ${breakLength}, adding 1 to it...`)
      setBreakLength(breakLength + 1);
    }
  }

  const decrementSession = () => {
    console.log("Decrement session");
    if (sessionLength <= 0) {
      console.log("Session has reached the minimum length (0)")
        return;
    } else {
      console.log(`Session length is ${sessionLength}, substracting 1 from it...`)
      setSessionLength(sessionLength - 1);
    }
  }

  const incrementSession = () => {
    console.log("Increment session");
    if (sessionLength > 60) {
      console.log("Session has reached the maximum length (60)")
      setSessionLength(60);
    } else {
      console.log(`Session length is ${sessionLength}, adding 1 to it...`)
      setSessionLength(sessionLength + 1);
    }
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
            {`${minutesDisplay}:${secondsDisplay}`}
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
