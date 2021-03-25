import './App.css';

function App() {
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
          <div id="time-left">25:00</div>
          <div className="timer-controls">
            <div id="start_stop">Stop</div>
            <div id="reset">Reset</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
