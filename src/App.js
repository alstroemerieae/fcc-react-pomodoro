import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let beepSound = document.getElementById('beep');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);

  const [secondsDisplay, setSecondsDisplay] = useState("66");
  const [minutesDisplay, setMinutesDisplay] = useState("77");

  const [isRunning, setIsRunning] = useState(false);
  const [currentLabel, setCurrentLabel] = useState("Session");

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  // console.log("_______________________________________")
  // console.log(`Current seconds:${seconds}`);
  // console.log(`Current minutes:${minutes}`);
  // console.log(`Current seconds display:${secondsDisplay}`);
  // console.log(`Current minutes display:${minutesDisplay}`);
  // console.log(`Current break length:${breakLength}`);
  // console.log(`Current session length:${sessionLength}`);
  // console.log(`Current running status:${isRunning}`);

  useEffect(() => {
    // This will set the current seconds/minutes to display as mm:ss format
    // Pass the current second/minute as a string and prepend a 0 if the current second/minute ranges from 0 to 9
    // Otherwise, just pass the current second as a string
    if (seconds <= 9){
      setSecondsDisplay("0" + seconds.toString())
    } else {
      setSecondsDisplay(seconds.toString());
    }
    if (minutes <= 9){
      setMinutesDisplay("0" + minutes.toString())
    } else {
      setMinutesDisplay(minutes.toString());
    }


    // This function will switch the timers (Session/Break) and play a sound when the countdown reaches 00:00
    if (minutes === 0 && seconds === 0) {
      beepSound.play();
      console.log('Stopping countdown!');
      setIsRunning(false);
      setSeconds(0);
      setMinutes(0);
      // If the current timer is Session, start Break timer after 1000ms
      if (currentLabel === "Session") {
        console.log("Ending session...");
        const breakTimer = setTimeout(() => {
          console.log('Starting break after 1 second!');
          setCurrentLabel("Break");
          setBreakLength(breakLength);
          setMinutes(breakLength);
          setSeconds(59);
        }, 1000);
        setIsRunning(true);
        return () => clearTimeout(breakTimer);
      }
      // If the current timer is Break, start Session timer after 1000ms
      else if (currentLabel === "Break") {
        console.log("Ending break...");
        const sessionTimer = setTimeout(() => {
          console.log('Starting session after 1 second!');
          setCurrentLabel("Session");
          setSessionLength(sessionLength);
          setMinutes(sessionLength);
          setSeconds(59);
        }, 1000);
        setIsRunning(true);
        return () => clearTimeout(sessionTimer);
      }
      // Check for errors when switching timers
      else {
        console.log("Error in timers switch")
      }
    }


    // This function will set the minutes and seconds of the timer
    if (isRunning === true) {
      // Set seconds to 59 and minutes to (minutes-1)
      if (seconds === 0) {
        // Run this after 1000ms
        // This will prevent a display bug like this:
        // 24:00 (1s)=> 23:00 (1s)=> 23:59
        // And will display this instead:
        // 24:00 (1s)=> 23:59
        const setMinutesAndSeconds = setTimeout(() => {
          console.log('This will run after 1 second!')
          setMinutes(minutes - 1);
          setSeconds(59);
        }, 1000);
        // Clear setTimeout
        return () => clearTimeout(setMinutesAndSeconds);
      }
      // Subtract 1 to seconds every 1000ms
      const subtractSecond = setInterval(() => {
        console.log('This will run every second!');
        setSeconds(seconds => seconds - 1);
      }, 1000);
      // Clear setInterval
      return () => clearInterval(subtractSecond);
    }
    // Check if the app is set to not run (isRunning === false)
    else {
      console.log('This will NOT run every second!');
    }
  }, [isRunning, minutes, seconds, breakLength, sessionLength, currentLabel, beepSound]);


  // This function will start/stop the timer
  const startStopTimer = () => {
    // Start timer
    if (isRunning === false) {
      console.log("Starting countdown");
      setIsRunning(true);
      if (seconds === 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    }
    // Stop timer
    else if (isRunning === true) {
      console.log("Pausing countdown");
      setIsRunning(false);
    }
    // Check for errors
    else {
      console.log("Error in timer start/stop")
    }
  }


  // This function will restart every variable of the pomodoro clock
  const restartTimer = () => {
    console.log("Restarting countdown");
    setSeconds(0);
    setMinutes(25);
    setSecondsDisplay("00");
    setMinutesDisplay("25");
    setBreakLength(5);
    setSessionLength(25);
    setCurrentLabel("Session");
    beepSound.pause();
    beepSound.currentTime = 0;
    setIsRunning(false);
  }


  // This function will decrease the break value by 1
  const decrementBreak = () => {
    console.log("Decrement break");
    if (breakLength === 1) {
      console.log("Break has reached the minimum length (1)");
      return;
    } else {
      console.log(`Break length is ${breakLength}, subtracting 1 from it...`);
      setBreakLength(breakLength - 1);
    }
  }

  // This function will increase the break value by 1
  const incrementBreak = () => {
    console.log("Increment break");
    if (breakLength >= 60) {
      console.log("Break has reached the maximum length (60)");
      return;
    } else {
      console.log(`Break length is ${breakLength}, adding 1 to it...`);
      setBreakLength(breakLength + 1);
    }
  }

  // This function will decrease the session value by 1
  const decrementSession = () => {
    console.log("Decrement session");
    if (sessionLength === 1) {
      console.log("Session has reached the minimum length (1)");
      return;
    } else {
      console.log(`Session length is ${sessionLength}, subtracting 1 from it...`);
      setSessionLength(sessionLength - 1);
      setMinutes(sessionLength - 1);
    }
  }

  // This function will increase the session value by 1
  const incrementSession = () => {
    console.log("Increment session");
    if (sessionLength >= 60) {
      console.log("Session has reached the maximum length (60)");
      return;
    } else {
      console.log(`Session length is ${sessionLength}, adding 1 to it...`);
      setSessionLength(sessionLength + 1);
      setMinutes(sessionLength + 1);
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
          {/* Timer label */}
          <div id="timer-label">{ currentLabel }</div>
          {/* Timer time left */}
          <div id="time-left">{`${minutesDisplay}:${secondsDisplay}`}</div>
          {/* Timer controls */}
          <div className="timer-controls">
            <div id="start_stop" onClick={ startStopTimer }>Start/Stop</div>
            <div id="reset" onClick={ restartTimer }>Reset</div>
          </div>
          {/* Timer soundfile */}
          <div className="timer-audio">
            <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
