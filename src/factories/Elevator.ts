export class Elevator {
  elvDiv: HTMLDivElement;
  elvImg: HTMLImageElement;
  isAvailable: boolean

  constructor(floorsCount: number) {
    this.elvDiv = this.createElevatorDiv();
    this.elvImg = this.createElevatorImg(`${floorsCount * 118}px`);
    this.isAvailable = true;
  }

  setAvailable(): void {
    this.isAvailable = !this.isAvailable
  }

  createElevatorDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("elv-div");
    return div;
  }

  createElevatorImg(height: string): HTMLImageElement {
    const img = document.createElement("img");
    img.src ='elv.png'
    img.alt = "Elevator";
    img.classList.add("elevator");
    img.style.top = height
    this.elvDiv.appendChild(img);
    return img;
  }
}
