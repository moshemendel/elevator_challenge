import { Timer } from "./Timer";
import { BuildingComponent } from "./absBuilding";

export class Floor extends BuildingComponent {
  floorNumber: number;
  floorDiv: HTMLDivElement;
  floorBtn: HTMLButtonElement;
  timer: Timer;
  isPressed: boolean = false;

  constructor(floorNumber: number) {
    super();
    this.floorNumber = floorNumber;
    this.floorDiv = this.createParentElement("floor");
    this.floorBtn = this.createChildElement();
    this.timer = new Timer(this);
  }

  createFloorElement = (): HTMLDivElement => {
    const floor = document.createElement("div");
    floor.classList.add("floor");
    return floor;
  };

  createChildElement = (): HTMLButtonElement => {
    const button = document.createElement("button");
    button.textContent = String(this.floorNumber);
    button.classList.add("metal", "linear", "floor-btn");
    this.floorDiv.appendChild(button);
    return button;
  };

  createTimerDivElement = () => {
    const timer = document.createElement("div");
    timer.textContent = String("00");
    timer.classList.add("metal", "timer");
    this.floorDiv.appendChild(timer);
    return timer;
  };

  updateFloorBtn = () => {
    this.floorBtn.classList.toggle("clicked");
    this.isPressed = !this.isPressed;
    this.timer.setTimer(0)
  };

  getFloorTop = (): number => this.floorDiv.offsetTop;
}
