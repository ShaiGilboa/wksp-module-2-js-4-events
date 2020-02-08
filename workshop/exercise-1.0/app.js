// Exercise 1.0
// ------------
// Write an app that registers a click anywhere on the screen.
// Once the user clicks, let them know that they did it!

// Hints:
// - Target the <body>

// OPTIONAL
// Feel free to add some CSS to this once you're done
// --------------------------------------------------

const main = document.querySelector('body');
const clickText = document.createElement('p');
clickText.style.visibility = 'hidden';
clickText.innerText = 'click!';
main.appendChild(clickText);

console.log('hi')
function handleClick (event) {
    clickText.style.visibility = 'visible'
    let timer = setTimeout(function () {
        clickText.style.visibility = 'hidden';
        clearTimeout(timer);
    },1000)
    console.log(event);
    console.log('click!');
}
main.style.backgroundColor = 'red';
main.style.height = '100vh'
main.style.widows = '100vw';
main.addEventListener("click", handleClick);
console.log(main);

