const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const resetSessionCountBtn = document.getElementById('reset-session-count-btn');
const modeDisplay = document.getElementById('mode');
const sessionCountDisplay = document.getElementById('session-count');
const taskInput = document.getElementById('task-input');

const BREAK_TIME = 5 * 60; // 5 minutes in seconds
const FOCUS_TIME = 25 * 60; // 25 minutes in seconds

let timer_left = FOCUS_TIME; 
let timerInterval = null;
let is_focus = true;
let session_count = 0;

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

        if (timer_left <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            if (is_focus) {
                is_focus = false;
                timer_left = BREAK_TIME;
                modeDisplay.textContent = 'Break';
                session_count++;
                sessionCountDisplay.textContent = session_count;
                localStorage.setItem('sessionCount', session_count);
            }else {
                is_focus = true;
                timer_left = FOCUS_TIME;
                modeDisplay.textContent = 'Focus';
            }
        }
        updateTimerDisplay();
    }, 1000)
});

resetBtn.addEventListener('click', function () {
    clearInterval(timerInterval);
    timerInterval = null;

    is_focus = true;
    timer_left = FOCUS_TIME;
    modeDisplay.textContent = 'Focus';

    updateTimerDisplay();
});

taskInput.addEventListener('input', function () {
    localStorage.setItem('currentTask', taskInput.value);
});

resetSessionCountBtn.addEventListener('click', function() {
    localStorage.setItem('sessionCount', 0);
    session_count = 0;
    sessionCountDisplay.textContent = session_count;
});

const savedTask = localStorage.getItem('currentTask');

if (savedTask !== null) {
    taskInput.value = savedTask;
}

const savedSessionCount = localStorage.getItem('sessionCount');

if (savedSessionCount !== null) {
    session_count = Number(savedSessionCount);
    sessionCountDisplay.textContent = session_count;
}

updateTimerDisplay();