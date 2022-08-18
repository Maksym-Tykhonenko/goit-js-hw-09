import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
    input: document.querySelector('#datetime-picker'),
    countdownBtn: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    daysCounter: document.querySelector('[data-days]'),
    hoursCounter: document.querySelector('[data-hours]'),
    minutesCounter: document.querySelector('[data-minutes]'),
    secondsCounter: document.querySelector('[data-seconds]'),
}

refs.countdownBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.warning('Please choose a date in the future', {
                position: 'center-top',
            });
            refs.countdownBtn.disabled = true;
            return;
        }
        refs.countdownBtn.disabled = false;
    },
};
flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
   
const onStartCountdown = () => {
    const timerId = setInterval(() => {
        const countdown = new Date(refs.input.value) - new Date();
        refs.countdownBtn.disabled = true;
        if (countdown >= 0) {
            refs.input.disabled = true;
            const timeObject = convertMs(countdown);
            refs.daysCounter.textContent = addLeadingZero(timeObject.days);
            refs.hoursCounter.textContent = addLeadingZero(timeObject.hours);
            refs.minutesCounter.textContent = addLeadingZero(timeObject.minutes);
            refs.secondsCounter.textContent = addLeadingZero(timeObject.seconds);
        } else {
            clearInterval(timerId);
            Notiflix.Notify.success('Finish!', {
                position: 'left-top',
            });
            refs.input.disabled = false;
        }
    }, 1000)
};

refs.countdownBtn.addEventListener('click', onStartCountdown);





