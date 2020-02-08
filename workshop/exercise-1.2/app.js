// Exercise 1.2
// ------------
// DON'T COPY/PASTE THE LAST EXERCISE. REWRITE IT FROM SCRATCH!
// Similar to the last exercise, write an app that gives the user
// a random amount of time (up to 5 seconds) to click anywhere on the screen.
// 
// But this time, let's let the user know how much time they have to actually 'click'.
// If they click inside of the required time, you should tell them that they've won,
// else let them know that they've lost.

// In short, 
// Replicate (and I mean, REWRITE it from scratch) the last exercise, and add
// - random amount of time to click
// - tell the user how much time they have to click.

// Challenge
// Make the countdown live...

const body = document.querySelector('body');
body.style.height = '100vh';
body.style.width = '100vw';
body.style.margin = 0;
body.style.padding = 0;

let time = randomNumber(1, 6);
document.getElementById('time').innerText = time;


let countdown = setInterval(() => {
    time --;
    document.getElementById('time').innerText = time;
    if (time == 0) {
        youLose();
    }
}, 1000);
console.log(time);
// document.getElementById('time').innerText = time;

body.addEventListener('click', function () {
    document.getElementById('result').innerText = 'You Win!'
    clearInterval(countdown);
})

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function youLose () {
    document.getElementById('result').innerText = 'You Lose!'
    clearInterval(countdown);
}