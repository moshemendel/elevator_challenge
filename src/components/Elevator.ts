import { BuildingComponent } from "./absBuilding";

export class Elevator extends BuildingComponent {
  elvDiv: HTMLDivElement;
  elvImg: HTMLImageElement;
  isAvailable: boolean;
  floorPixels: number = 116;
  atFloor: number = 0;

  constructor(top: number) {
    super();
    this.elvDiv = this.createParentElement("elevator");
    this.elvImg = this.createChildElement(`${top - this.floorPixels}px`);
    this.isAvailable = true;
  }

  createElevatorDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("elv-div");
    return div;
  }

  createChildElement(top: string): HTMLImageElement {
    const img = document.createElement("img");
    img.classList.add("elevator-img");
    img.src = "elv.png";
    img.alt = "Elevator";
    img.style.top = top;
    this.elvDiv.appendChild(img);
    return img;
  }

  getElvTop = () => this.elvImg.offsetTop;
  setAvailable = () => (this.isAvailable = !this.isAvailable);
  setTopPosition = (top: number) => (this.elvImg.style.top = `${top}px`);
  setFloor = (floor: number) => (this.atFloor = floor);
}
