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

  getBuildingFirstFloorTop(): number {
    let Top: number = 0;
    const elements = document.getElementsByClassName("floor");
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      console.log(lastElement);
      // console.log(Math.floor(lastElement.getBoundingClientRect().height));
      Top = Math.floor(lastElement.getBoundingClientRect().top);
    }
    return Top;
  }
}
