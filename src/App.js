import './App.css';
import {useState, useEffect} from "react";

function App() {
    const [breakTime, setBreakTime] = useState(5);
    const [sessionTime, setSessionTime] = useState(25);
    const [timeLabel, setTimeLabel] = useState("Session");
    const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        setTimeLeft(sessionTime * 60);
    }, [sessionTime])

    useEffect(() => {
        let interval;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        if (timeLabel === "Session") {
                            setTimeLabel("Break");
                            setTimeLeft(breakTime * 60);
                        } else {
                            setTimeLabel("Session");
                            setTimeLeft(sessionTime * 60);
                        }
                        const audio = document.getElementById("beep");
                        audio.currentTime = 0;
                        audio.play();
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerRunning, timeLabel, breakTime, sessionTime]);


    const incrementBreakLength = () => {
        if (breakTime < 60) {
            setBreakTime(breakTime + 1);
        }
    }

    const decrementBreakLength = () => {
        if (breakTime > 1) {
            setBreakTime(breakTime - 1);
        }
    }

    const incrementSessionLength = () => {
        if (sessionTime < 60) {
            setSessionTime(sessionTime + 1);
        }
    }

    const decrementSessionLength = () => {
        if (sessionTime > 1) {
            setSessionTime(sessionTime - 1);
        }
    }

    const handleStartStop = () => {
        setTimerRunning(prevTimerRunning => !prevTimerRunning);
    }

    const handleReset = () => {
        setBreakTime(5);
        setSessionTime(25);
        setTimeLabel("Session");
        setTimeLeft(sessionTime * 60);
        setTimerRunning(false);
        setReset(!reset);
        const audio = document.getElementById("beep");
        audio.pause();
        audio.currentTime = 0;
    }


    return (
        <div className="App">
            <div id="clock">
                <h1 id="header">25 + 5 Clock</h1>
                <div id="settings">
                    <div id="break-settings">
                        <h2 id="break-label">Break Length</h2>
                        <div className="set-time">
                            <div id="break-decrement" onClick={decrementBreakLength}>↓</div>
                            <p id="break-length">{breakTime}</p>
                            <div id="break-increment" onClick={incrementBreakLength}>↑</div>
                        </div>
                    </div>
                    <div id="session-settings">
                        <h2 id="session-label">Session Length</h2>
                        <div className="set-time">
                            <div id="session-decrement" onClick={decrementSessionLength}>↓</div>
                            <p id="session-length">{sessionTime}</p>
                            <div id="session-increment" onClick={incrementSessionLength}>↑</div>
                        </div>
                    </div>
                </div>


                <div id="display">
                    <h2 id="timer-label">{timeLabel}</h2>
                    <h1 id="time-left">
                        {`${Math.floor(timeLeft / 60)
                            .toString()
                            .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`}
                </h1>
                </div>

                <div className="timer-control">
                    <button id="start_stop" onClick={handleStartStop}>
                        <i className={`fa ${timerRunning ? 'fa-pause' : 'fa-play'} fa-2x`} />
                    </button>

                    <button id="reset" onClick={handleReset}><i className="fa fa-refresh fa-2x"></i></button>
                </div>

                <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            </div>
        </div>
    );
}

export default App;
