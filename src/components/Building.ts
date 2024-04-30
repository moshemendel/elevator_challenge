export class Building {
  buildingDivElement: HTMLDivElement;
  floorsDivElement: HTMLDivElement;
  elevatorsDivElement: HTMLDivElement;
  floorPixels: number = 118;
  buildingHeight: number;
  constructor(numFloors: number) {
    this.buildingDivElement = this.createBuildingDiv();
    this.floorsDivElement = this.createFloorsDiv();
    this.elevatorsDivElement = this.createElevatorsDiv();
    this.buildingHeight = numFloors * 118;
  }

  createBuildingDiv = (): HTMLDivElement => {
    const div = document.createElement("div");
    div.classList.add("building");
    return div;
  };

  createFloorsDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("floors-div");
    this.buildingDivElement.appendChild(div);
    return div;
  }

  createElevatorsDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("elv-area");
    this.buildingDivElement.appendChild(div);
    return div;
  }

  getBuildingFirstElementBottom(element: string): number {
    let Top: number = 0;
    const elements = document.getElementsByClassName(element);
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      Top = Math.floor(lastElement.getBoundingClientRect().bottom);
    }
    return Top;
  }
}
