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
  private _number: number;
  private _floor: HTMLElement;
  private _button: HTMLElement;
  timer: Timer;
  private _isPressed: boolean = false;

  /**
   * Creates a new Floor instance.
   * @constructor
   * @param {number} floorNumber - The number of the floor.
   */
  constructor(floorNumber: number) {
    super();
    this._number = floorNumber;
    this._floor = this.createElement("div", "floor");
    this._button = this.createChildElement();
    this.timer = this.addTimer();
  }

  /**
   * Creates the button element for the floor.
   * @returns {HTMLElement} The created button element.
   */
  createChildElement = (): HTMLElement => {
    const classes = ["metal", "linear", "floor-btn"];
    const button = this.createElement("button", classes);
    button.textContent = `${this._number}`;
    this.floor.appendChild(button);
    return button;
  };

  /**
   * Updates the floor button state and timer.
   */
  updateBtn = () => {
    this._button.classList.toggle("clicked");
    this._isPressed = !this.isPressed;
    this.timer.setTimer(0);
  };

  /**
   * create Timer using Timer Class. appand timer to floor div
   * @returns {Timer} Timer element.
   */
  addTimer(): Timer {
    const timer = new Timer();
    this._floor.appendChild(timer.timer);
    return timer;
  }

  /**
   * Returns a boolean value indicating whether the floor button is currently pressed.
   * @returns {boolean} - True if the floor button is pressed, false otherwise.
   */
  get isPressed(): boolean {
    return this._isPressed;
  }

  /**
   * Gets the top position of the floor element.
   * @returns {number} The top position of the floor.
   */
  get top(): number {
    return this._floor.offsetTop;
  }

  /**
   * This method returns the floor main div.
   * @returns {HTMLElement} The floor element.
   */
  get floor(): HTMLElement {
    return this._floor;
  }

  /**
   * This method returns the floor button.
   * @returns {HTMLElement} The button element for this floor.
   */
  get button(): HTMLElement {
    return this._button;
  }

  /**
   * This getter method returns the current value of the _number property.
   * @returns {number} The floor number.
   */
  get number(): number {
    return this._number;
  }
}
