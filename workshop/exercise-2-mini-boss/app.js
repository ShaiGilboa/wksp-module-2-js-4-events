// current time

// get current time (HOW?)
// show it
const setTimer = document.getElementById('setTimer');
const startTimer = document.getElementById('startTimer');
const timer = document.getElementById('timer');
const timerSeconds = document.getElementById('timerSeconds');
const timerMinutes = document.getElementById('timerMinutes');
const timerHours = document.getElementById('timerHours');


let timerInterval = undefined;
let timerTime = {hours: 0, minutes: 0, seconds: 0}

const stopwatchBtns = document.getElementById("stopwatchBtns");
stopwatchBtns.style.display = 'flex';
stopwatchBtns.style.flexDirection = 'column';

const resetStopwatch = document.getElementById('resetStopwatch');

const stopwatchBtn = document.getElementById('stopwatchBtn');
const stopwatchShow = document.getElementById('stopwatchShow');
let stopwatch =  {hours: 0, minutes: 0, seconds: 0};
let stopWatchInterval = undefined;

const currentTime = document.getElementById('currentTime');
let tenthOfASecond = new Date();

let now = new Date();
let time =  {hours: 0, minutes: 0, seconds: 0};

let intf = setInterval(() => {
    time = setCurretTime(new Date(), time);
    currentTime.innerText = `${time.hours}:${time.minutes}:${time.seconds}`;
}, 100);

function setCurretTime(date, time){
    time.seconds = date.getSeconds();
    time.minutes = date.getMinutes();
    time.hours = date.getHours();
    return prepTimeForPrint (time);
}

function prepTimeForPrint (time) {
    time = adjustTimeObject(time);
    if (time.seconds < 10) {
        time.seconds = `0${time.seconds}`;
    } else {
        time.seconds = "" + time.seconds;
    }
    if (time.minutes < 10) {
        time.minutes = `0${time.minutes}`;
    } else {
        time.minutes = "" + time.minutes;
    }
    if (time.hours < 10) {
        time.hours = `0${time.hours}`;
    } else {
        time.hours = "" + time.hours;
    }
    return time;
}

function adjustTimeObject (time) {
    let newTime = {hours: 0, minutes: 0, seconds: 0};;
    if (time.seconds >= 60) {
        time.minutes++;
        time.seconds = 0;
    }
    if (time.minutes >= 60) {
        time.hours ++;
        time.minutes = 0;
    }
    if (time.hours >= 24) {
        time.hours = 0;
    }
    if (time.seconds < 0) {
        time.minutes--;
        time.seconds = 59;
    }
    if (time.minutes < 0) {
        time.hours --;
        time.minutes = 59;
    }
    if (time.hours < 0) {
        time.hours = -1;
        console.log('Time!')
    }
    newTime.seconds = time.seconds;
    newTime.minutes = time.minutes;
    newTime.hours = time.hours
    return newTime;
}
// timer

// create a timer that counts down the time to 0 from an innput
// how do I get an input?
// if timer === 0 
    // stop timing
    // make sound

function startStopwatch () {
    resetStopwatch.style.display = 'none';
    stopwatchBtn.removeEventListener('click', startStopwatch);
    stopwatchBtn.innerText = "Pause Stopwatch";
    stopWatchInterval = setInterval(() => {
        stopwatch.seconds = stopwatch.seconds + 1;
        let printStopwatch = prepTimeForPrint(stopwatch);
        stopwatchShow.innerText = `${printStopwatch.hours}:${printStopwatch.minutes}:${printStopwatch.seconds}`;
    }, 1000);
    stopwatchBtn.addEventListener('click', pauseStopwatch); 
}

function pauseStopwatch() {
    clearInterval(stopWatchInterval);
    stopwatchBtn.innerText = "Continue";
    resetStopwatch.style.display = 'inline-block';
    stopwatchBtn.addEventListener('click', startStopwatch);
    resetStopwatch.addEventListener('click', setStopwatchZero);
}

function setStopwatchZero() {
    resetStopwatch.removeEventListener('click', setStopwatchZero);
    resetStopwatch.style.display = 'none';
    stopwatchBtn.innerText = 'Start Stopwatch';
    stopwatch =  {hours: 0, minutes: 0, seconds: 0};
    let printStopwatch = prepTimeForPrint(stopwatch);
    stopwatchShow.innerText = `${printStopwatch.hours}:${printStopwatch.minutes}:${printStopwatch.seconds}`;
}

stopwatchBtn.addEventListener('click', startStopwatch);

function clearTimer () {

}

function settingTimer (){
    setTimer.removeEventListener('click', settingTimer);
    setTimer.innerText = "Clear Timer";
    setTimer.addEventListener('click', clearTimer);

    timerTime.seconds = timerSeconds.value;
    timerTime.minutes = timerMinutes.value;
    timerTime.hours = timerHours.value;

    let printTimer = prepTimeForPrint(timerTime);
    timer.innerText = `${printTimer.hours}:${printTimer.minutes}:${printTimer.seconds}`;
}

function clearTimer () {
    setTimer.removeEventListener('click', clearTimer);
    setTimer.innerText = "Set Timer";
    setTimer.addEventListener('click', settingTimer);
    timerTime = {hours: 0, minutes: 0, seconds: 0}
    let printTimer = prepTimeForPrint(timerTime);
    timer.innerText = `${printTimer.hours}:${printTimer.minutes}:${printTimer.seconds}`;
}

function startingtimer() {
    startTimer.removeEventListener('click', startingtimer);
    timerInterval = setInterval(() => {
        timerTime.seconds = timerTime.seconds - 1;
        let printTimer = prepTimeForPrint(timerTime);
        if (printTimer.hours !== '0-1') {
            timer.innerText = `${printTimer.hours}:${printTimer.minutes}:${printTimer.seconds}`;
        } else {
            clearInterval(timerInterval);
            clearTimer();
            startTimer.addEventListener('click', startingtimer);
            new Audio('../../assets/timer.mp3').play();
        }
    }, 1000);
}


setTimer.addEventListener('click', settingTimer);
startTimer.addEventListener('click', startingtimer);


// stop watch

// create a timer with an external variable to count up the time
// a btn to start/stop and restart the timer


// function countTime() {
//     timeOfTimer += ;
// }

// let stopWatchInterval = setInterval(() => {
//     countTime();
// }, interval);