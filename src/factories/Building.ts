import { Elevator } from "./Elevator";
import { Floor } from "./Floor";

export class Building {
  buildingDivElement: HTMLDivElement;
  floorsDivElement: HTMLDivElement;
  elevatorsDivElement: HTMLDivElement;
  buildingHeight: number;
  elevators: Elevator[] = [];
  requestStack: Floor[] = [];
  reqInProgress: boolean = false;
  dingSound: string = "ding.mp3";

  constructor(numFloors: number, numElevators: number) {
    this.buildingDivElement = this.createBuildingDiv();
    this.floorsDivElement = this.createFloorsDiv();
    this.elevatorsDivElement = this.createElevatorsDiv();
    this.buildingHeight = numFloors * 118;
    this.stackManager();
  }

  handleClick = (floor: Floor) => {
    if (!floor.isPressed) {
      floor.isPressed = true;
      this.updateFloorBtn(floor);
      console.log("handle floor: " + floor.floorNumber);
      this.requestStack.push(floor);
    }
  };

  stackManager = () => {
    const intervalId = setInterval(() => {
      if (
        this.requestStack.length > 0 &&
        this.elevators.some((e) => e.isAvailable)
      ) {
        const floor = this.requestStack.shift() as Floor;
        console.log(`Request stack: handling floor ${floor.floorNumber}`);
        this.processRequest(floor);
      }
    }, 100);
  };

  processRequest = (floor: Floor) => {
    const elvNum = this.getClosestElv(floor.floorDiv.offsetTop);
    const elevator = this.elevators[elvNum];
    elevator.setAvailable();
    this.updateElvPos(floor, elevator);
  };

  updateFloorBtn = (floor: Floor) => {
    floor.floorBtn.classList.toggle("clicked");
  };

  getClosestElv = (pos: number) => {
    let closestElv: number = 0;
    let minDist = this.buildingHeight + 100;
    for (let i = 0; i < this.elevators.length; i++) {
      if (this.elevators[i].isAvailable) {
        const _dist = Math.abs(this.elevators[i].elvImg.offsetTop - pos);
        if (_dist < minDist) {
          minDist = _dist;
          closestElv = i;
        }
      }
    }
    return closestElv;
  };

  updateElvPos = (floor: Floor, elevator: Elevator) => {
    const floorPos = floor.floorDiv.offsetTop;
    let elevatorPos = elevator.elvImg.offsetTop;

    const id = setInterval(() => {
      if (floorPos === elevatorPos) {
        clearInterval(id);
        this.updateFloorBtn(floor);
        this.playSound();
        setTimeout(() => {
          elevator.setAvailable();
          floor.isPressed = false;
        }, 2000);
      } else {
        if (elevatorPos > floorPos) elevatorPos--;
        else elevatorPos++;
        elevator.elvImg.style.top = `${elevatorPos}px`;
      }
    }, 4); // this interval will move the elvator at time of one second between two floors
  };

  createBuildingDiv = (): HTMLDivElement => {
    const div = document.createElement("div");
    div.classList.add("building");
    return div;
  };

  createFloorsDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("floors-area");
    this.buildingDivElement.appendChild(div);
    return div;
  }

  createElevatorsDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.style.height = `${this.buildingHeight * 118}px`;
    div.classList.add("elv-area");
    this.buildingDivElement.appendChild(div);
    return div;
  }

  playSound = () => {
    new Audio(this.dingSound).play();
  };
}
