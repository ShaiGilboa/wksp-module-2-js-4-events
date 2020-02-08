// make the balloon 0 size
const balloon = document.getElementById("balloon");
const MIN_SIZE = 6;
const MAX_SIZE = 60;
const INC = 2;
const MAX_EXPLOSION_SIZE = 1000;

let balloonSize = 12;
balloon.style.fontSize = `${balloonSize}px`;

// if balloon is >= a certain amount
// remove the event listener
// remove balloon / add explosion emojy
// start explosion animation - grows incrementaly
// if the explosion size is >= Y
// stop growing
// fade out
// if key down. target = arrow down
// if balloon is >=  0
// balloon smaller




function handleKeyDown(event) {
    //if key down. target = arrow up
    if (event.key === "ArrowUp") {
        console.log('up')
        // as long as we are smaller then the maximum size
        if (balloonSize <= MAX_SIZE){
            // make the size of the ballon bigger
            balloonSize += INC;
            balloon.style.fontSize = `${balloonSize}px`;
            // if we have reached the maximum size
        } else {
            //remove the event listener
            window.removeEventListener('keydown', handleKeyDown)
            // change the inner text to explosion
            balloon.innerText = '💥';
            // make it grow in a set interval
            const explosion = setInterval(function () {
                // increase the size of the explosion
                balloonSize += 40;
                //set the size of explosion to new size
                balloon.style.fontSize = `${balloonSize}px`;
                // when we reacj the ,aximum size of explosion
                if (balloonSize >= MAX_EXPLOSION_SIZE) {
                    // we stopp the interval to stop the growing
                    clearInterval(explosion);
                    // and ake is disappear
                    balloon.style.opacity = 0;
                }
            }, 1)
            
        }
    
    // if the key stoke is down
    } else if (event.key == "ArrowDown") {
        console.log('down')
        // as long as we are bigger then the minimum size
        if (balloonSize >= MIN_SIZE){
            // decreae the size of the balloon
            balloonSize -= INC;
            balloon.style.fontSize = `${balloonSize}px`;
        }
    }
}

// event listener for key down 
window.addEventListener('keydown', handleKeyDown)
