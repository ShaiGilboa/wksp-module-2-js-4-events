const BUTTON_AMOUNT = 200;
const main = document.getElementById('main');

let buttons = [];
let i = 0;
const buttonInterval = setInterval(() => {
    let button = document.createElement('button');
    button.innerText = `${i+1}`;
    button.classList.add('button');
    button.id = `button#${i}`;
    main.appendChild(button);
    buttons.push(button);
    buttons[i].addEventListener('click', handleClick);
    i++;
    if (i === BUTTON_AMOUNT){
        clearInterval(buttonInterval);
        console.log(buttons);
    }
}, 10);

function handleClick(event) {
    let greenButton = document.getElementById(`${event.target.id}`);
    greenButton.style.backgroundColor = '#d2e89b';
}