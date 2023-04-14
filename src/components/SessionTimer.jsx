import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'

const SessionTimer = () => {
  // Session variables
  const [defaultSession, setDefaultSession] = useState(25)
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [sessionSeconds, setSessionSeconds] = useState(60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const nextSecond = sessionSeconds - 1;
  const nextMinute = sessionMinutes - 1;

  // Break variables
  const [defaultBreak, setDefaultBreak] = useState(5)
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(60);
  const nextBreakSecond = breakSeconds - 1;
  const nextBreakMinute = breakMinutes - 1;

  console.log(breakMinutes + ":" + breakSeconds)

  //Timer controls
  const [clockRefresh, setClockRefresh] = useState(true);
  const [clockRunning, setClockRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
  const audio = document.getElementById("beep");
  // const [playAudio, setPlayAudio] = useState(false);

  // Views
  const [defaultView, setDefaultView] = useState(sessionMinutes > 9 ? `${sessionMinutes}:00` : `0${sessionMinutes}:00`)
  const [breakView, setBreakView] = useState(breakMinutes > 9 ? `${breakMinutes}:00` : `0${breakMinutes}:00`)

  let sessionInterval = null;
  let breakInterval = null;
  // let audio = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav');

  // Determines whether timer is active
  function toggle() {
    setIsActive(!isActive);
  }

  // Increments session minutes
  function incrementSessionMinutes() {
    if (sessionMinutes < 60) {
      setSessionMinutes(sessionMinutes + 1);
      setDefaultSession(defaultSession + 1);
      setDefaultView(sessionMinutes > 8 ? `${sessionMinutes + 1}:00` : `0${sessionMinutes + 1}:00`)
    }
  }

  // Decrements session minutes
  function decrementSessionMinutes() {
    if (sessionMinutes > 1) {
      setSessionMinutes(sessionMinutes - 1);
      setDefaultSession(defaultSession - 1);
      setDefaultView(sessionMinutes > 10 ? `${sessionMinutes - 1}:00` : `0${sessionMinutes - 1}:00`)
    }
  }

  // Increments break minutes
  function incrementBreakMinutes() {
    if (breakMinutes < 60) {
      setBreakMinutes(breakMinutes + 1);
      setDefaultBreak(defaultBreak + 1);
      setBreakView(breakMinutes > 8 ? `${breakMinutes + 1}:00` : `0${breakMinutes + 1}:00`)
    }
  }

  // Decrements break minutes
  function decrementBreakMinutes() {
    if (breakMinutes > 1) {
      setBreakMinutes(breakMinutes - 1);
      setDefaultBreak(defaultBreak - 1);
      setBreakView(breakMinutes > 10 ? `${breakMinutes - 1}:00` : `0${breakMinutes - 1}:00`)

    }
  }

  // Sets session & break length id's so the set lengths won't decrement along with the timer
  function setDefaults() {
    setDefaultSession(defaultSession)
    setDefaultBreak(defaultBreak)
    setClockRefresh(false)
  }

  // Resets to all defaults
  function resetTimer() {
    setIsActive(false)
    setIsBreak(false)
    setClockRefresh(true)
    setTimerLabel("Session");
    setPlayPause(<FontAwesomeIcon icon={faPlay} />)
    setDefaultSession(25)
    setSessionMinutes(25)
    setSessionSeconds(60)
    setDefaultBreak(5)
    setBreakMinutes(5)
    setBreakSeconds(60)
    setDefaultView(`${25}:00`)
    audio.pause();
    audio.currentTime = 0;
    clearInterval(sessionInterval)
    clearInterval(breakInterval)
  }

  // useEffect(() => {
  //   playAudio === true ? audio.play() : audio.pause()
  // })

  // Switches play/pause icon & sets timer to play or pause
  useEffect(() => {
    if (isActive === true) {
      setPlayPause(<FontAwesomeIcon icon={faPause} />)
    } else {
      setPlayPause(<FontAwesomeIcon icon={faPlay} />)

    }
  }, [isActive]
  )

  // SESSION EFFECT - controls session timer countdown
  useEffect(() => {
    setDefaults();
    if (isActive && isBreak === false && nextSecond >= 10) {
      // setDefaults();
      sessionInterval = setInterval(myCallback, 1000)
      function myCallback() {
        setSessionSeconds(nextSecond);
        setDefaultView(sessionMinutes > 9 ? `${nextMinute}:${nextSecond}` : `0${nextMinute}:${nextSecond}`)
      }
    } else if (isActive && isBreak === false && nextSecond < 10 && nextSecond >= 0) {
      // setDefaults();
      sessionInterval = setInterval(myCallback, 1000)
      function myCallback() {
        setSessionSeconds(nextSecond);
        setDefaultView(sessionMinutes > 9 ? `${nextMinute}:0${nextSecond}` : `0${nextMinute}:0${nextSecond}`)
      }
    } else if (isActive && isBreak === false && nextSecond === -1) {
      // setDefaults();
      if (nextMinute > 0) {
        setSessionMinutes(nextMinute)
        setSessionSeconds(nextSecond + 61);
      }
      else {
        // setTimeout(() => {
        console.log("Timer done!");
        setTimerLabel("Break");
        setIsBreak(true);
        // setSessionSeconds(sessionSeconds => sessionSeconds + 60);
        // setSessionMinutes(defaultSession)
        // setDefaultView(sessionMinutes > 9 ? `${defaultSession}:0${0}` : `0${defaultSession}:0${0}`)
        setBreakSeconds(breakSeconds => breakSeconds + 60);
        setBreakMinutes(defaultBreak)
        setBreakView(breakMinutes > 9 ? `${defaultBreak}:0${0}` : `0${defaultBreak}:0${0}`)
        audio.play();
        // }, 1000)
      }
    }
    return () => clearInterval(sessionInterval);
  }, [isActive, isBreak, sessionSeconds]);

  // BREAK EFFECT - controls break timer countdown
  useEffect(() => {
    if (isActive && isBreak === true && nextBreakSecond >= 10) {
      setDefaults();
      breakInterval = setInterval(myCallback, 1000)
      function myCallback() {
        setBreakSeconds(nextBreakSecond)
        setBreakView(breakMinutes > 9 ? `${nextBreakMinute}:${nextBreakSecond}` : `0${nextBreakMinute}:${nextBreakSecond}`)
      }
    } else if (isActive && isBreak === true && nextBreakSecond < 10 && nextBreakSecond > -1) {
      setDefaults();
      breakInterval = setInterval(myCallback, 1000)
      function myCallback() {
        setBreakSeconds(nextBreakSecond);
        setBreakView(`0${nextBreakMinute}:0${nextBreakSecond}`)
      }
    } else if (isActive && isBreak === true && nextBreakSecond === -1) {
      setDefaults();
      if (nextBreakMinute > 0) {
        setBreakMinutes(nextBreakMinute)
        setBreakSeconds(nextBreakSecond + 60);
      }
      else {
        setTimeout(() => {
          console.log('Break timer done!');
          setIsBreak(false)
          setTimerLabel("Session");
          setSessionSeconds(sessionSeconds => sessionSeconds + 60);
          setSessionMinutes(defaultSession)
          setDefaultView(sessionMinutes > 9 ? `${defaultSession}:0${0}` : `0${defaultSession}:0${0}`)
          audio.play();
          // setBreakSeconds(breakSeconds => breakSeconds + 60);
          // setBreakMinutes(defaultBreak)
          // setBreakView(breakMinutes > 9 ? `${defaultBreak}:0${0}` : `0${defaultBreak}:0${0}`)
        }, 1000)
      }
    }
    return () => clearInterval(breakInterval);
  }, [isActive, isBreak, breakSeconds]);


  return (
    <>
      <div id="blocks">
        <div id="session-block">
          <p id="session-label">Session Length</p>
          <div id="session-counter">
            <button id="session-increment" onClick={incrementSessionMinutes}><i>
              <FontAwesomeIcon icon={faArrowUp} /></i></button>
            <div id="session-length" className="expand">{defaultSession}</div>
            {/*             isActive === false ? sessionMinutes :  */}
            <button id="session-decrement" onClick={decrementSessionMinutes}><i>
              <FontAwesomeIcon icon={faArrowDown} /></i></button>
          </div>
        </div>
        <div id="break-block">
          <p id="break-label">Break Length</p>
          <div id="break-counter">
            <button id="break-increment" onClick={incrementBreakMinutes}><i>
              <FontAwesomeIcon icon={faArrowUp} /></i></button>
            <div id="break-length" className="expand">{defaultBreak}</div>
            <button id="break-decrement" onClick={decrementBreakMinutes}><i>
              <FontAwesomeIcon icon={faArrowDown} /></i></button>
          </div>
        </div>
      </div>
      <div id="timer-border">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">
          {/*           {defaultView} */}
          {isActive === false && isBreak === false && clockRefresh === true ? defaultView :
            isActive === true && isBreak === false && clockRefresh === false ? defaultView :
              isActive === false && isBreak === false && clockRefresh === false ? defaultView :
                breakView}
        </div>
      </div>
      <div id="timer-options">
        <button id="start_stop" onClick={() => {
          toggle();
        }}><i>
            {playPause}</i></button>
        <button id="reset" onClick={() => {
          resetTimer();
        }}><i><FontAwesomeIcon icon={faUndo} /></i></button>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </>
  )
}

export default SessionTimer;