import { BuildingComponent } from "./absBuilding";

/**
 * Represents an elevator component with position, availability, and functionality.
 * @class
 * @extends BuildingComponent
 */
export class Elevator extends BuildingComponent {
  /**
   * @prop {elvDiv}: The main div element representing the elevator.
   * @prop {elvImg}: The image element representing the elevator cabin.
   * @prop {isAvailable}: Flag indicating if the elevator is available for use.
   * @prop {floorPixels}: The height of each floor in pixels.
   * @prop {atFloor}: The current floor where the elevator is located.
   */
  private _elevator: HTMLElement;
  private _img: HTMLImageElement;
  private _isAvailable: boolean;
  private _floorPixels: number = 116;
  private _atFloor: number = 0;

  /**
   * Creates a new Elevator instance at the specified top position.
   * @constructor
   * @param {number} top - The top position of the elevator.
   */
  constructor(top: number) {
    super();
    this._elevator = this.createElement("div", "elevator");
    this._img = this.createChildElement(`${top - this._floorPixels}px`);
    this._isAvailable = true;
  }

  /**
   * Creates the image element for the elevator cabin.
   * @param {string} top - The top position of the elevator cabin.
   * @returns {HTMLImageElement} The created elevator image element.
   */
  createChildElement(top: string): HTMLImageElement {
    const img = document.createElement("img");
    img.classList.add("elevator-img");
    img.src = "elv.png";
    img.alt = "Elevator";
    img.style.top = top;
    this._elevator.appendChild(img);
    return img;
  }

  /**
   * Sets the top position of the elevator cabin.
   * @param {number} top - The new top position in pixels.
   */
  set top(top: number) {
    this._img.style.top = `${top}px`;
  }

  /**
   * Sets the current floor where the elevator is located.
   * @param {number} floor - The floor number.
   */
  set floor(floor: number) {
    this._atFloor = floor;
  }
  /**
   * This method returns the floor main div.
   * @returns {HTMLDivElement} The floor element.
   */
  get elevator(): HTMLElement {
    return this._elevator;
  }
  /**
   * Sets the current floor where the elevator is located.
   * @returns {number} floor - The floor number.
   */
  get floor(): number {
    return this._atFloor;
  }
  /**
   * Gets the top position of the elevator cabin.
   * @returns {number} The top position of the elevator cabin.
   */
  get top(): number {
    return this._img.offsetTop;
  }

  /**
   * Sets the availability status of the elevator.
   * @param {boolean} state - whether the elevator is available or not
   */
  set isAvailable(state: boolean) {
    this._isAvailable = state;
  }

  /**
   * This getter method returns the current availability state of the object as a boolean value.
   * @returns {boolean} The availability state of the elevator.
   */
  get isAvailable(): boolean {
    return this._isAvailable;
  }
}
