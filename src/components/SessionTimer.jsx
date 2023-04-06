import React, { useState, useEffect, isValidElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faPlay, faUndo, faPause } from '@fortawesome/free-solid-svg-icons'

const SessionTimer = () => {
  // Session variables
  const [defaultSession, setDefaultSession] = useState(1)
  const [sessionMinutes, setSessionMinutes] = useState(1);
  const [sessionSeconds, setSessionSeconds] = useState(60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const nextSecond = sessionSeconds - 1;
  const nextMinute = sessionMinutes - 1;

  // Break variables
  const [defaultBreak, setDefaultBreak] = useState(2)
  const [breakMinutes, setBreakMinutes] = useState(2);
  const [breakSeconds, setBreakSeconds] = useState(60);
  const nextBreakSecond = breakSeconds - 1;
  const nextBreakMinute = breakMinutes - 1;

  //Timer controls
  const [clockRefresh, setClockRefresh] = useState(true);
  const [clockRunning, setClockRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [playPause, setPlayPause] = useState(<FontAwesomeIcon icon={faPlay} />);
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
    setSessionMinutes(sessionMinutes + 1);
    // timeLeft.innerText = sessionMinutes > 8 ? `${sessionMinutes + 1}:00` : `0${sessionMinutes + 1}:00`
    setDefaultSession(defaultSession + 1);
    setDefaultView(sessionMinutes > 9 ? `${sessionMinutes + 1}:00` : `0${sessionMinutes + 1}:00`)
  }

  // Decrements session minutes
  function decrementSessionMinutes() {
    if (sessionMinutes > 1) {
      setSessionMinutes(sessionMinutes - 1);
      // timeLeft.innerText = sessionMinutes > 10 ? `${sessionMinutes - 1}:00` : `0${sessionMinutes - 1}:00`
      setDefaultSession(defaultSession);
      setDefaultView(sessionMinutes > 9 ? `${sessionMinutes}:00` : `0${sessionMinutes}:00`)
    }
  }

  // Increments break minutes
  function incrementBreakMinutes() {
    setBreakMinutes(breakMinutes + 1);
    setDefaultBreak(defaultBreak + 1);
  }

  // Decrements break minutes
  function decrementBreakMinutes() {
    if (breakMinutes > 1) {
      setBreakMinutes(breakMinutes - 1);
      setDefaultBreak(defaultBreak - 1);

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
    setDefaultSession(1)
    setSessionMinutes(1)
    setSessionSeconds(60)
    setDefaultBreak(5)
    setBreakMinutes(5)
    setBreakSeconds(60)
    setDefaultView(`${1}:00`)
    // setPlayAudio(false)
    clearInterval(sessionInterval)
    clearInterval(breakInterval)
  }

  useEffect(() => {
    // playAudio === true ? audio.play() : audio.pause()
  })

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
    if (isActive && isBreak === false && nextSecond >= 10) {
      // setDefaultView(sessionMinutes > 9 ? `${sessionMinutes}:0${0}` : `0${sessionMinutes}:0${0}`),
      setDefaults();
      sessionInterval = setInterval(myCallback, 100)
      function myCallback() {
        setSessionSeconds(nextSecond);
        setDefaultView(sessionMinutes > 9 ? `${nextMinute}:${nextSecond}` : `0${nextMinute}:${nextSecond}`)
      }
    } else if (isActive && isBreak === false && nextSecond < 10 && nextSecond >= 0) {
      setDefaults();
      sessionInterval = setInterval(myCallback, 100)
      function myCallback() {
        setSessionSeconds(nextSecond);
        setDefaultView(sessionMinutes > 9 ? `${nextMinute}:0${nextSecond}` : `0${nextMinute}:0${nextSecond}`)
        console.log(defaultSession)
      }
    } else if (isActive && isBreak === false && nextSecond === -1) {
      setDefaults();
      if (nextMinute > 0) {
        setSessionMinutes(nextMinute)
        setSessionSeconds(nextSecond + 61);
      }
      else {
        setIsBreak(true)
        console.log('Timer done!')
        setIsBreak(true)
        setTimerLabel("Break")
        setSessionSeconds(sessionSeconds + 60)
        setSessionMinutes(defaultSession)
        setDefaultView(breakMinutes > 9 ? `${defaultSession}:0${0}` : `0${defaultSession}:0${0}`)
        // setPlayAudio(true)
        // setSessionSeconds(sessionSeconds + 60)
        // setSessionMinutes(defaultSession)
        // console.log(sessionMinutes),
        // setTimerLabel("Break")
        // setTimeout(function(){
        //     console.log('wait')
        // }, 1000);
        // setBreakView(breakMinutes > 9 ? `${defaultBreak}:0${0}` : `0${defaultBreak}:0${0}`)
      }
    }
    return () => clearInterval(sessionInterval);
  }, [isActive, isBreak, sessionSeconds]);

  // BREAK EFFECT - controls break timer countdown
  useEffect(() => {
    // let interval = null;
    // setPlayAudio(false);
    // if (isBreak === true && nextMinute === 0 && nextSecond === -1) {
    //   setSessionSeconds(sessionSeconds + 59)
    //   setSessionMinutes(defaultSession)
    //   console.log(defaultSession)
    //   console.log('hello')
    // }
    // function delay(time) {
    //       return new Promise(resolve => setTimeout(resolve, time));
    //     }
    //     delay(1000).then(() =>
    //       setBreakView(breakMinutes > 9 ? `${breakMinutes}:0${0}` : `0${breakMinutes}:0${0}`),
    //     );
    if (isActive && isBreak === true && nextBreakSecond >= 10) {
      setDefaults();
      breakInterval = setInterval(myCallback, 100)
      function myCallback() {
        setBreakSeconds(nextBreakSecond)
        setBreakView(breakMinutes > 9 ? `${nextBreakMinute}:${nextBreakSecond}` : `0${nextBreakMinute}:${nextBreakSecond}`)
      }
    } else if (isActive && isBreak === true && nextBreakSecond < 10 && nextBreakSecond > -1) {
      setDefaults();
      breakInterval = setInterval(myCallback, 100)
      function myCallback() {
        setBreakSeconds(nextBreakSecond);
        setBreakView(`0${nextBreakMinute}:0${nextBreakSecond}`)
      }
    } else if (isActive && isBreak === true && nextBreakSecond === -1) {
      setDefaults();
      if (nextBreakMinute > 0) {
        setBreakMinutes(nextBreakMinute)
        setBreakSeconds(nextBreakSecond + 61);
      }
      else {
        console.log('Break timer done!');
        setIsBreak(false)
        setTimerLabel("Session");
        setBreakSeconds(breakSeconds + 59),
        setBreakMinutes(defaultBreak)
        setBreakView(breakMinutes > 9 ? `${defaultBreak}:0${0}` : `0${defaultBreak}:0${0}`)
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
            <div className="expand"><i id="session-increment" onClick={incrementSessionMinutes}>
              <FontAwesomeIcon icon={faArrowUp} /></i></div>
            <div id="session-length" className="expand">{defaultSession}</div>
            {/*             isActive === false ? sessionMinutes :  */}
            <div className="expand"><i id="session-decrement" onClick={decrementSessionMinutes}>
              <FontAwesomeIcon icon={faArrowDown} /></i></div>
          </div>
        </div>
        <div id="break-block">
          <p id="break-label">Break Length</p>
          <div id="break-counter">
            <div className="expand"><i id="break-increment" onClick={incrementBreakMinutes}>
              <FontAwesomeIcon icon={faArrowUp} /></i></div>
            <div id="break-length" className="expand">{defaultBreak}</div>
            <div className="expand"><i id="break-decrement" onClick={decrementBreakMinutes}>
              <FontAwesomeIcon icon={faArrowDown} /></i></div>
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
          {/*           {isActive === true && isBreak === false && clockRefresh === false ?
            sessionPlayView :
            isActive === false && isBreak === false && clockRefresh === false ?
              sessionPauseView :
              isActive === false && clockRefresh === true ?
                defaultView : 'NG'} */}
        </div>
      </div>
      <div id="timer-options">
        <div id="start_stop"><i className="fa-solid fa-play" onClick={() => {
          toggle();
        }}>
          {playPause}</i></div>
        <div id="reset"><i className="fas fa-undo" onClick={() => {
          resetTimer();
        }}><FontAwesomeIcon icon={faUndo} /></i></div>
      </div>
    </>
  )
}

export default SessionTimer;
