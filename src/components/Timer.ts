import { Floor } from "./Floor";

export class Timer {
  timerDiv: HTMLDivElement;
  intervalId: NodeJS.Timeout | null = null;

  constructor(floor: Floor) {
    this.timerDiv = this.createTimerDivElement(floor);
  }

  createTimerDivElement = (floor: Floor) => {
    const timer = document.createElement("div");
    timer.textContent = String("00");
    timer.classList.add("metal", "timer");
    floor.floorDiv.appendChild(timer);
    return timer;
  };

  setTimer(countdown: number) {
    this.timerDiv.textContent = `${countdown.toString().padStart(2, "0")}`;
  }

  setCountdown(countdown: number) {
    countdown = Math.floor(countdown);
    this.setTimer(countdown);
    this.intervalId = setInterval(() => {
      countdown--;
      this.setTimer(countdown);
    }, 1000);
  }

  stopCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
