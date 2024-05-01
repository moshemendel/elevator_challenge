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
  elvDiv: HTMLDivElement;
  elvImg: HTMLImageElement;
  isAvailable: boolean;
  floorPixels: number = 116;
  atFloor: number = 0;

  /**
   * Creates a new Elevator instance at the specified top position.
   * @constructor
   * @param {number} top - The top position of the elevator.
   */
  constructor(top: number) {
    super();
    this.elvDiv = this.createParentElement("elevator");
    this.elvImg = this.createChildElement(`${top - this.floorPixels}px`);
    this.isAvailable = true;
  }

  /**
   * Creates the main div element for the elevator.
   * @returns {HTMLDivElement} The created elevator div element.
   */
  createElevatorDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("elv-div");
    return div;
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
    this.elvDiv.appendChild(img);
    return img;
  }

  /**
   * Gets the top position of the elevator cabin.
   * @returns {number} The top position of the elevator cabin.
   */
  getElvTop = () => this.elvImg.offsetTop;

  /**
   * Toggles the availability status of the elevator.
   */
  setAvailable = () => (this.isAvailable = !this.isAvailable);

  /**
   * Sets the top position of the elevator cabin.
   * @param {number} top - The new top position in pixels.
   */
  setTopPosition = (top: number) => (this.elvImg.style.top = `${top}px`);

  /**
   * Sets the current floor where the elevator is located.
   * @param {number} floor - The floor number.
   */
  setFloor = (floor: number) => (this.atFloor = floor);
}
