import { BuildingComponent } from "./absBuilding";

export class Building extends BuildingComponent {
  buildingDiv: HTMLDivElement;
  floorsDiv: HTMLDivElement;
  elevatorsDiv: HTMLDivElement;
  buildingHeight: number;
  floorPixels: number = 116;
  numFloors: number = 0;

  constructor(numFloors: number) {
    super();
    this.numFloors = numFloors;
    this.buildingDiv = this.createParentElement("building");
    this.floorsDiv = this.createChildElement("floors-div");
    this.elevatorsDiv = this.createChildElement("elvs-div");
    this.buildingHeight = numFloors * this.floorPixels;
  }

  createChildElement = (className: string) => {
    const div = this.createParentElement(className);
    this.buildingDiv.appendChild(div);
    return div;
  };

  getBuildingFirstElementBottom(element: string): number {
    let top: number = 0;
    const elements = document.getElementsByClassName(element);
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      top = Math.floor(lastElement.getBoundingClientRect().bottom);
    }
    return top;
  }

  addElevator = (elevator: Element) => this.elevatorsDiv.appendChild(elevator);
  addFloor = (floor: Element) => this.floorsDiv.appendChild(floor);
}
