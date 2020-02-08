const BOTTUNS_AMOUUNT = 200;
const main = document.getElementById('main');

let buttons = [];
let i = 0;
const buttonsInterval = setInterval(() => {
    let button = document.createElement('button');
    button.innerText = `${i+1}`;
    button.classList.add('button');
    button.id = `button#${i}`;
    main.appendChild(button);
    setRandomPlace(button);
    buttons.push(button);
    button.addEventListener('click', handleClickToGreen);
    i++;
    if (i === BOTTUNS_AMOUUNT) {
        clearInterval(buttonsInterval);
        // console.log(buttons);
    }
}, 0);

function handleClickToGreen(event) {
    let buttonToGreen = document.getElementById(`${event.target.id}`);
    buttonToGreen.removeEventListener('click', handleClickToGreen);
    buttonToGreen.style.backgroundColor = '#d2e89b';
    buttonToGreen.addEventListener('click', handleClickToRed);
}

function handleClickToRed(event) {
    let buttonToRed = document.getElementById(`${event.target.id}`);
    buttonToRed.removeEventListener('click', handleClickToRed);
    buttonToRed.style.backgroundColor = '#eb7652';
    buttonToRed.addEventListener('click', handleClickToGreen);
}

function randomInRange(min , max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function setRandomPlace(button) {
        let top = randomInRange(0,100);
        let left = randomInRange(0,100);
        if (top > 50){
            button.style.top = `calc(${top}% - 20px`;
        } else {            
            button.style.top = `calc(${top}%`;
        }
        if (left > 50 ) {
            button.style.left = `calc(${left}% - 60px`;
        } else {
            button.style.left = `calc(${left}%`;
        }
        if (!checkOcupied(button)){
            setRandomPlace(button);
        }
}

function checkOcupied(button) {
    for (let i = 0; i < buttons.length; i++) {
        let rect = button.getBoundingClientRect();
        let rectI = buttons[i].getBoundingClientRect();
        if (!(rect.right < rectI.left || rect.left > rectI.right || rect.bottom < rectI.top || rect.top > rectI.bottom)) {
            return false;
        }
        
    }
    return true;
}

