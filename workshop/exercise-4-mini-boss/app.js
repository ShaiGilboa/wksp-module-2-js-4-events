const BOTTUNS_AMOUUNT = 20;
const main = document.getElementById('main');
const heading = document.getElementById('heading');
const timeLeft = document.getElementById('timeLeft');
const shade = document.getElementById('shade');
const instructions = document.getElementById('instructions');

let timeToPlay =  undefined;
let timeLeftInterval = undefined

timeLeft.innerText = timeToPlay;


let buttons = [];
let i = 0;

let greenCounter = 0;

function handleStartClick() {
    startBtn.removeEventListener('click', handleStartClick)
    instructions.style.display = 'none'
    new Audio('../../assets/start.mp3').play();
    timeToPlay = randomInRange(10, 15)
    startBtn.style.display = 'none';
    let buttonsInterval = setInterval(() => {
        let button = document.createElement('button');
        button.innerText = `${i+1}`;
        button.classList.add('button');
        button.id = `button#${i+1}`;
        main.appendChild(button);
        setRandomPlace(button);
        buttons.push(button);
        button.addEventListener('click', handleClickToGreen);
        i++;
        if (i === BOTTUNS_AMOUUNT) {
            clearInterval(buttonsInterval);
        }
    },10)

    heading.style.display = "block";
    timeLeft.innerText = timeToPlay;
    timeLeftInterval = setInterval(() => {
        timeToPlay -- ;
        timeLeft.innerText = timeToPlay;
        if (timeToPlay === 0) {
            clearInterval(timeLeftInterval);
            removeAllEventListerners();
            youLose();
        }
    }, 1000);
    // let timeToPlay
}

function removeAllEventListerners() {
    for (let i = 0; i < buttons.length; i++){
        let buttonId = document.getElementById(buttons[i].id);
        if (buttonId.style.backgroundColor === 'rgb(210, 232, 155)') {
            buttonId.removeEventListener('click', handleClickToRed);
        } else {
            buttonId.removeEventListener('click', handleClickToGreen);
        }
    }
}

function handleClickToGreen(event) {
    greenCounter++;
    let buttonToGreen = document.getElementById(`${event.target.id}`);
    new Audio('../../assets/redToGreen.mp3').play();
    buttonToGreen.removeEventListener('click', handleClickToGreen);
    buttonToGreen.style.backgroundColor = '#d2e89b';
    buttonToGreen.addEventListener('click', handleClickToRed);
    if (greenCounter === buttons.length) {
        clearInterval(timeLeftInterval);
        removeAllEventListerners();
        youWin();
    }

}

function handleClickToRed(event) {
    greenCounter--;
    let buttonToRed = document.getElementById(`${event.target.id}`);
    new Audio('../../assets/greenToRed.mp3').play();
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
            button.style.top = `calc(${top}% + 100px`;
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

const startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', handleStartClick)




function youLose() {
    const youLose = document.getElementById('youLose');
    new Audio('../../assets/lose.mp3').play();
    // shade.style.visibility = 'visible';
    youLose.style.display = "flex"
    const missed = document.getElementById('missedNumber');
    missed.innerText = ` ${buttons.length - greenCounter} `;

}

function youWin() {
    const youWin = document.getElementById('youWin');
    // shade.style.visibility = 'visible';
    new Audio('../../assets/win.mp3').play();
    youWin.style.display = 'flex';
}

function intervalTimer() {
        
}

// btn.addEventListener('click', startGame);