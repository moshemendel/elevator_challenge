import { Timer } from "./Timer";
import { BuildingComponent } from "./absBuilding";

/**
 * Represents a floor within a building with floor number, elements, and functionality.
 * @class
 * @extends BuildingComponent
 */
export class Floor extends BuildingComponent {
  /**
   * @property {floorNumber}: The number of the floor.
   * @property {floorDiv}: The main div element representing the floor.
   * @property {floorBtn}: The button element for the floor.
   * @property {timer}: The timer associated with the floor.
   * @property {isPressed}: Flag indicating if the floor button is pressed.
   */
  floorNumber: number;
  floorDiv: HTMLDivElement;
  floorBtn: HTMLButtonElement;
  timer: Timer;
  private _isPressed: boolean = false;

  /**
   * Creates a new Floor instance.
   * @constructor
   * @param {number} floorNumber - The number of the floor.
   */
  constructor(floorNumber: number) {
    super();
    this.floorNumber = floorNumber;
    this.floorDiv = this.createParentElement("floor");
    this.floorBtn = this.createChildElement();
    this.timer = this.addTimer();
  }

  /**
   * Creates the button element for the floor.
   * @returns {HTMLButtonElement} The created button element.
   */
  createChildElement = (): HTMLButtonElement => {
    const button = document.createElement("button");
    button.textContent = String(this.floorNumber);
    button.classList.add("metal", "linear", "floor-btn");
    this.floorDiv.appendChild(button);
    return button;
  };

  /**
   * Updates the floor button state and timer.
   */
  updateFloorBtn = () => {
    this.floorBtn.classList.toggle("clicked");
    this._isPressed = !this.isPressed;
    this.timer.setTimer(0);
  };

  /**
   * Gets the top position of the floor element.
   * @returns {number} The top position of the floor.
   */
  getFloorTop = (): number => this.floorDiv.offsetTop;

  /**
   * create Timer using Timer Class. appand timer to floor div
   * @returns {Timer} Timer element.
   */
  addTimer(): Timer {
    const timer = new Timer();
    this.floorDiv.appendChild(timer.timer);
    return timer;
  }

  /**
   * Returns a boolean value indicating whether the floor button is currently pressed.
   * @returns {boolean} - True if the floor button is pressed, false otherwise.
   */
  get isPressed(): boolean {
    return this._isPressed;
  }
  get top(): number {
    return this.floorDiv.offsetTop;
  }
}
