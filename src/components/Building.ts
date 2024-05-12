import { BuildingComponent } from "./absBuilding";
/**
 * Represents a building with floors and elevators.
 * @class
 * @extends BuildingComponent
 */
export class Building extends BuildingComponent {
  /**
   * @property {buildingDiv}: The main building container element.
   * @property {floorsDiv}: The container element for floors.
   * @property {elevatorsDiv}: The container element for elevators.
   * @property {numFloors}: The number of floors in the building.
   * @property {floorPixels}: The height of each floor in pixels.
   * @property {buildingHeight}: The total height of the building in pixels.
   *
   */
  private _building: HTMLElement;
  private _floors: HTMLElement;
  private _elevators: HTMLElement;
  private _numFloors: number = 0;
  private _floorPixels: number = 116;
  private _height: number;
  /**
   * Creates a new Building instance.
   * @constructor
   * @param {number} numFloors - The number of floors in the building.
   */
  constructor(numFloors: number) {
    super();
    this._numFloors = numFloors;
    this._building = this.createElement("div", "building");
    this._floors = this.createChildElement("floors-div");
    this._elevators = this.createChildElement("elvs-div");
    this._height = numFloors * this._floorPixels;
  }

  /**
   * Creates a child element within the building.
   * @param {string} className - The class name of the child element.
   * @returns {HTMLDivElement} The created child element.
   */
  createChildElement = (className: string): HTMLElement => {
    const div = this.createElement("div", className);
    this._building.appendChild(div);
    return div;
  };

  /**
   * Gets the top position of the last element with the specified class.
   * @returns {number} The top position in pixels.
   */
  get elevatorTopPos(): number {
    let top: number = 0;
    const elements = document.getElementsByClassName("floor");
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      console.log(lastElement.getBoundingClientRect());
      top = Math.floor(lastElement.getBoundingClientRect().bottom);
    }
    return top;
  }

  /**
   * Adds an elevator element to the elevators container.
   * @param {Element} elevator - The elevator element to add.
   */
  addElevator = (elevator: Element) => this._elevators.appendChild(elevator);

  /**
   * Adds a floor element to the floors container.
   * @param {Element} floor - The floor element to add.
   */
  addFloor = (floor: Element) => this._floors.appendChild(floor);

  /**
   * This getter method returns the building div element.
   * @returns {HTMLElement} The building div element.
   */
  get building(): HTMLElement {
    return this._building;
  }

  /**
   * This getter method returns the current value of the numFloors property.
   * @returns {number} The value of the numFloors property.
   */
  get numFloors(): number {
    return this._numFloors;
  }

  /**
   * This getter method returns the current value of the _height property.
   * @returns {number} The building height.
   */
  get height(): number {
    return this._height;
  }
}
