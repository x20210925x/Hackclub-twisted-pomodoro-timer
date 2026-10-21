const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

let timer_left = 25*60; // 25 minutes in seconds
let timerInterval = null;

function updateTimerDisplay() {
    const minutes = Math.floor(timer_left / 60);
    const seconds = timer_left % 60;

    timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', function () {
    if (timerInterval !== null){
        return;
    }

    timerInterval = setInterval(function() {
        timer_left--;
        updateTimerDisplay();
    }, 1000)
})

resetBtn.addEventListener('click', function () {
    clearInterval(timerInterval);
    timerInterval = null;

    timer_left = 25 * 60;
    updateTimerDisplay();
})