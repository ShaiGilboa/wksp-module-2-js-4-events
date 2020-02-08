const BUTTON_AMOUNT = 200;
const main = document.getElementById('main');

let buttons =[];
let i = 0;
let buttonsInterval = setInterval(() => {
    let button = document.createElement('button');
    button.innerText = `${i+1}`;
    button.classList.add('button');
    button.id = `button#${i}`;
    buttons.push(button);
    button.addEventListener('click', handleButtonClick);
    main.appendChild(button);
    i++;
    if (i === BUTTON_AMOUNT) {
        clearInterval(buttonsInterval);
    }
}, 10);

function handleButtonClick(event) {
    let greenButton = document.getElementById(`${event.target.id}`);
    greenButton.style.background = '#d2e89b';
    greenButton.removeEventListener('click', handleButtonClick);
    greenButton.addEventListener('click', handleGreenButtonClick);
}

function handleGreenButtonClick(event) {
    let greenButton = document.getElementById(`${event.target.id}`);
    greenButton.removeEventListener('click', handleGreenButtonClick)
    greenButton.style.background = '#eb7652';
    greenButton.addEventListener('click', handleButtonClick);
}