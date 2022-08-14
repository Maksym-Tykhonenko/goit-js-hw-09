const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}
const TIME_COL_DALEY = 1000;

refs.btnStart.addEventListener('click', onChangeCol);
refs.btnStop.addEventListener('click', stopChangeCol);

let intervalId = null;

function onChangeCol() {
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, TIME_COL_DALEY);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
};


function stopChangeCol(){
    clearInterval(intervalId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
