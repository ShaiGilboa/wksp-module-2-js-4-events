// Exercise 2.3
// ------------
// DON'T COPY/PASTE THE LAST EXERCISE. REWRITE IT FROM SCRATCH! (This is the last time.)
// Similar to the last exercise, write an app that gives the user
// a random amount of time (up to 5 seconds) to click the screen.

// It would be a good idea to create a new function that will manage the whole game.

const body = document.querySelector('body');
const timer = document.getElementById('timer');
const result = document.getElementById('result');
const btn = document.createElement('button');
const timeText = document.querySelector('.time-text');

body.style.height = '100vh';
body.style.width = '100vw';
body.style.margin = 0;
body.style.padding = 0;
body.style.position = 'absolute';
body.style.top = 0;
body.style.display = 'block';
body.style.textAlign = 'center';


timeText.style.visibility = 'hidden';

result.innerText = 'Y';
result.style.visibility = 'hidden';

btn.innerText = 'Start';
btn.style.justifyContent = 'center';
body.appendChild(btn);



let countdown = undefined;
let time = undefined;
console.log(time)

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function youLose() {
    result.innerText = "You Lose!";
    result.style.visibility = 'visible';

    clearInterval(countdown);
    body.removeEventListener('click', youWin)

    btn.style.display = 'inline-block';
    // body.style.display = 'block';
    // btn.style.textAlign = 'center';
}

function youWin() {
    result.innerText = "You Win!";
    result.style.visibility = 'visible';

    clearInterval(countdown);
    body.removeEventListener('click', youWin)

    btn.style.display = 'inline-block';
    // body.style.display = 'block';
    // btn.style.textAlign = 'center';
}

function intervalTimer() {
        time --;
        timer.innerText = time;
        if (time === 0 ) {
            youLose();
        }
}


function startGame(event) {
    event.stopPropagation()
    
    
    btn.style.display = 'none';

    time = randomNumber(1,3);

    result.style.visibility = 'hidden';
    
    timeText.style.visibility = 'visible';
    timer.innerText = time

    countdown = setInterval(intervalTimer, 1000);

    body.addEventListener('click', youWin);

}

btn.addEventListener('click', startGame);