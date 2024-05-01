import { Floor } from "./Floor";

/**
 * Represents a timer associated with a floor, managing countdown functionality.
 * @class
 */
export class Timer {
  /**
   * @property {timerDiv}: The div element representing the timer.
   * @property {intervalId}: The ID of the interval for countdown updates.
   */
  timerDiv: HTMLDivElement;
  intervalId: NodeJS.Timeout | null = null;

  /**
   * Creates a new Timer instance for a specific floor.
   * @constructor
   * @param {Floor} floor - The floor associated with the timer.
   */
  constructor(floor: Floor) {
    this.timerDiv = this.createTimerDivElement(floor);
  }

  /**
   * Creates the timer div element and appends it to the floor's div.
   * @param {Floor} floor - The floor associated with the timer.
   * @returns {HTMLDivElement} The created timer element.
   */
  createTimerDivElement = (floor: Floor) => {
    const timer = document.createElement("div");
    timer.textContent = String("00");
    timer.classList.add("metal", "timer");
    floor.floorDiv.appendChild(timer);
    return timer;
  };

  /**
   * Sets the timer display with the provided countdown value.
   * @param {number} countdown - The countdown value to display.
   */
  setTimer(countdown: number) {
    this.timerDiv.textContent = `${countdown.toString().padStart(2, "0")}`;
  }

  /**
   * Initiates a countdown with the specified value and updates the timer display.
   * @param {number} countdown - The countdown value to start from.
   */
  setCountdown(countdown: number) {
    countdown = Math.floor(countdown);
    this.setTimer(countdown);
    this.intervalId = setInterval(() => {
      countdown--;
      this.setTimer(countdown);
    }, 1000);
  }

  /**
   * Stops the countdown interval if it is active.
   */
  stopCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
