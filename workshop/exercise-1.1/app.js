// Exercise 1.1
// ------------
// Write an app that gives the user 1s (or 1000ms) to click anywhere on the screen.
// 
// If they click inside of the required time, you should tell them that they've won,
// else let them know that they've lost.

// Hints:
// - Target the <body>
// - setTimout is your friend.
// - You'll a flag to store whether the user has won or lost

// OPTIONAL
// Feel free to add some CSS to this once you're done
// --------------------------------------------------
function random (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


const instruction = document.createElement('h1');
const body = document.querySelector('body');
const result = document.createElement('h2');

    

body.style.height = '100vh';
body.style.width = '100vw';
body.style.margin = 0;
body.style.padding = 0;

let time = random(1,7);

instruction.innerText = `You have ${time} to click!`;
body.appendChild(instruction);

result.style.textAlign = 'center';
result.style.justifyContent = 'center';
body.appendChild(result)

body.addEventListener('click', function () {
    result.innerText = 'You Win!'
    clearTimeout(timer);
});

let timer = setTimeout(function () {
    result.innerText = 'You Lose!'
    clearTimeout(timer);
}, 1000*time)
