const P1_SIZE = '50px';
const P2_SIZE = '100px';

const main = document.getElementById('main');
let prizeP1 = undefined;
const prizeToWin = document.getElementById('prizeToWin');
const startBtn = document.getElementById('startBtn');
const instructionsRestartBtn = document.getElementById('instructionsRestartBtn');
const xBtn = document.getElementById('xBtn');
const instructions = document.getElementById('instructions');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p1Win = document.getElementById('p1Win');
const p2Win = document.getElementById('p2Win');
const winMessage = document.getElementById('winMessage');
const numberWin = document.getElementById('numberWin');
const signal = document.getElementById('signal');
const winningMessage = document.getElementById('winMessage');

const BG_MUSIC = new Audio("./sounds/bg.mp3");
// BG_MUSIC.volume = 0.5;
const LOSE_MUSIC = new Audio("./sounds/lose.mp3");
const PRIZE_MUSIC = new Audio("./sounds/prize.mp3");
const SIGNAL_MUSIC = new Audio("./sounds/signal.mp3");
const WIN_MUSIC = new Audio("./sounds/win.mp3");



let roundTimer = undefined;
let keyDown = undefined;

let timeClear = false;
let p1WinCounter = 0;
let p2WinCounter = 0;

p1.style.visibility = 'hidden';
p2.style.visibility = 'hidden';

function randomNumberInRange (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function handleInstructions() {
    instructionsRestartBtn.removeEventListener('click', handleInstructions)
    startBtn.style.visibility = 'hidden';
    instructionsRestartBtn.style.visibility = 'hidden'
    instructions.style.visibility = 'visible';
    xBtn.addEventListener('click', handleMoveToStartMenu);
}

function handleMoveToStartMenu() {
    xBtn.removeEventListener('click', handleMoveToStartMenu)
    instructions.style.visibility = 'hidden';
    StartMenu();
}

function StartMenu() {
    p1.style.visibility = 'hidden';
    p2.style.visibility = 'hidden';
    instructionsRestartBtn.style.visibility = 'visible';
    startBtn.style.visibility = 'visible';
    instructionsRestartBtn.addEventListener('click', handleInstructions);
}

function resetVisuals() {
    p1.style.maxHeight = P1_SIZE;
    p2.style.maxHeight = P2_SIZE;
    p1Win.style.visibility = 'hidden';
    p2Win.style.visibility = 'hidden';
    winningMessage.style.visibility = 'hidden';
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`p1Prize${i}`).style.visibility = 'hidden';
        document.getElementById(`p2Prize${i}`).style.visibility = 'hidden';
    }
    p1WinCounter = 0;
    p2WinCounter = 0;
}

function handleRestartGame(){
    instructionsRestartBtn.removeEventListener('click', handleRestartGame);
    clearTimeout(roundTimer);
    resetVisuals();
    handleStartGame();
}

function handleStartGame() {
    p1.style.maxHeight = P1_SIZE;
    p2.style.maxHeight = P2_SIZE;
    clearTimeout(roundTimer);
    WIN_MUSIC.pause();
    BG_MUSIC.play();
    startBtn.removeEventListener('click', handleStartGame);
    instructionsRestartBtn.removeEventListener('click', handleInstructions);
    instructionsRestartBtn.style.visibility = 'hidden';
    startBtn.style.visibility = 'hidden';
    prizeToWin.style.visibility = 'visible';
    p1.style.visibility = 'visible';
    p2.style.visibility = 'visible';
    gamePlay();
}

function gamePlay(){
    main.addEventListener('keydown', handelKeyPressed);
    roundGenerator();
}

function positionSignal() {
    signal.style.left = `${randomNumberInRange(4,95)}%`;
    signal.style.top = `${randomNumberInRange(4,95)}%`;
    signal.style.transform = `rotate(${randomNumberInRange(0,361)}deg)`;
    signal.style.visibility = 'visible';
}

function roundGenerator(){
    timeClear = false;
    let roundTime = randomNumberInRange(3,6);
    roundTimer = setTimeout(() => {
        clearTimeout(roundTimer);
        SIGNAL_MUSIC.play();
        positionSignal();
        timeClear = true;
    }, 1000*roundTime);
}

function playerLose(loser) {
    loser.style.maxHeight = '15px';
    LOSE_MUSIC.play();
    newRound();
}

function playerWinMiss(win, miss){
    playerWin(win);
    playerMiss(miss);
    main.removeEventListener('keydown', handelKeyPressed);
}

function playerLoseWin(lose,win) {
    clearTimeout(roundTimer);
    playerLose(lose);
    playerWin(win);
    main.removeEventListener('keydown', handelKeyPressed);
}

function handelKeyPressed (event) {
    if (timeClear === true) {
        if (event.key === 'p') {
            playerWinMiss(p2,p1);
        } else if (event.key === 'q') {
            playerWinMiss(p1,p2);
        }
    } else if (event.key === 'p') {
        playerLoseWin(p2,p1);
    } else if (event.key === 'q') {
        playerLoseWin(p1,p2);
    }
}

function addPoint (winner) {
    PRIZE_MUSIC.play();
    let winnerId = winner.id;
    let pointAdded = undefined;
    if (winnerId === 'p1'){
        p1WinCounter++;
        pointAdded = document.getElementById(`${winnerId}Prize${p1WinCounter}`)
    } else {
        p2WinCounter ++;
        pointAdded = document.getElementById(`${winnerId}Prize${p2WinCounter}`)
    }
    pointAdded.style.visibility = 'visible';
}

function gameWinner(theWinner) {
    main.removeEventListener('keydown', handelKeyPressed);
    BG_MUSIC.pause();
    WIN_MUSIC.play();
    winningMessage.innerText = `${theWinner.id} WINS!`;
    winningMessage.style.visibility = 'visible';
    instructionsRestartBtn.innerText = "Restart";
    instructionsRestartBtn.style.visibility = "visible";
    signal.style.visibility = 'hiddden';
    instructionsRestartBtn.addEventListener('click', handleRestartGame);
}

function newRound() {
    instructionsRestartBtn.innerText = "Next Round";
    instructionsRestartBtn.style.visibility = "visible";
    instructionsRestartBtn.addEventListener('click', handleNextRound);
}

function checkEnd() {
    if (p1WinCounter === 3){
        gameWinner(p1);
    } else if (p2WinCounter === 3){
        gameWinner(p2);
    } else newRound();
}

function playerWin (winner) {
    let idWin = document.getElementById(`${winner.id}Win`);
    winner.style.visibility = 'hidden';
    idWin.style.visibility = 'visible';
    prizeToWin.style.visibility = 'hidden';
    signal.style.visibility = 'hidden';

    (winner.id === 'p1') ? addPoint(p1) : addPoint(p2);

    checkEnd();
}

function handleNextRound() {
    signal.style.visibility = 'hidden';
    instructionsRestartBtn.removeEventListener('click', handleNextRound);
    instructionsRestartBtn.style.visibility = 'hidden';
    p1.style.visibility = 'visible';
    p1.style.visibility = 'visible';
    p1Win.style.visibility = 'hidden';
    p2Win.style.visibility = 'hidden';
    handleStartGame();
}

function playerMiss (loser) {
    loser.style.maxHeight = '40px';
}

startBtn.addEventListener('click', handleStartGame);
instructionsRestartBtn.addEventListener('click', handleInstructions);

