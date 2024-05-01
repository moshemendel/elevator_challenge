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
   * @property {buildingHeight}: The total height of the building in pixels.
   * @property {floorPixels}: The height of each floor in pixels.
   * @property {numFloors}: The number of floors in the building.
   * 
   */
  buildingDiv: HTMLDivElement;
  floorsDiv: HTMLDivElement;
  elevatorsDiv: HTMLDivElement;
  buildingHeight: number;
  floorPixels: number = 116;
  numFloors: number = 0;
  /**
   * Creates a new Building instance.
   * @constructor
   * @param {number} numFloors - The number of floors in the building.
   */
  constructor(numFloors: number) {
    super();
    this.numFloors = numFloors;
    this.buildingDiv = this.createParentElement("building");
    this.floorsDiv = this.createChildElement("floors-div");
    this.elevatorsDiv = this.createChildElement("elvs-div");
    this.buildingHeight = numFloors * this.floorPixels;
  }
  /**
   * Creates a child element within the building.
   * @param {string} className - The class name of the child element.
   * @returns {HTMLDivElement} The created child element.
   */
  createChildElement = (className: string) => {
    const div = this.createParentElement(className);
    this.buildingDiv.appendChild(div);
    return div;
  };

  /**
   * Gets the top position of the last element with the specified class.
   * @param {string} element - The class name of the elements to search.
   * @returns {number} The top position in pixels.
   */
  getElevatorTopPos(element: string): number {
    let top: number = 0;
    const elements = document.getElementsByClassName(element);
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      top = Math.floor(lastElement.getBoundingClientRect().bottom);
    }
    return top;
  }
  /**
   * Adds an elevator element to the elevators container.
   * @param {Element} elevator - The elevator element to add.
   */
  addElevator = (elevator: Element) => this.elevatorsDiv.appendChild(elevator);
  /**
   * Adds a floor element to the floors container.
   * @param {Element} floor - The floor element to add.
   */
  addFloor = (floor: Element) => this.floorsDiv.appendChild(floor);
}
