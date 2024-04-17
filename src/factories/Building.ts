import { Elevator } from "./Elevator";
import { Floor } from "./Floor";

export class Building {
  BuildingDivElement: HTMLDivElement;
  floorsDivElement: HTMLDivElement;
  ElevatorsDivElement: HTMLDivElement;
  buildingHeight: number;
  elevators: Elevator[] = [];
  requestStack: Floor[] = [];
  reqInProgress: boolean = false;

  constructor(floorsCount: number) {
    this.BuildingDivElement = this.createBuildingDiv();
    this.floorsDivElement = this.createFloorsDiv();
    this.ElevatorsDivElement = this.createElevatorsDiv();
    this.buildingHeight = floorsCount * 118;
    document.addEventListener("floorClicked", this.handleClick);
    this.stackManager()
  }

  handleClick = (event: Event) => {
    const customEvent = event as CustomEvent;
    const floor: Floor = customEvent.detail
    this.updateFloorBtn(floor)
    console.log("handle floor: " + floor.floorNumber);
    this.requestStack.push(floor);
  };
  
  stackManager = () =>{
    const intervalId = setInterval(() => {
      if (this.requestStack.length > 0) {
        // while(this.reqInProgress){}
        // this.reqInProgress = true
        console.log("Request stack is not empty. Performing action...");
        const request = this.requestStack.shift() as Floor;
        this.processRequest(request);
      }}, 100);
  }

  processRequest = (floor :Floor) => {
    const elvNum = this.getClosestElv(floor.floorDiv.offsetTop);
    const elevator = this.elevators[elvNum];
    elevator.setAvailable()
    // this.updateElvStatus(elevator)
    this.updateElvPos(floor, elevator);
  }

  updateFloorBtn = (floor :Floor) => {
    floor.floorBtn.classList.toggle('clicked')
  }

  getClosestElv = (pos: number) => {
    let closestElv = 0;
    let dist = this.buildingHeight + 100;
    for (let i = 0; i < this.elevators.length; i++) {
      if (this.elevators[i].isAvailable){
          const _dist = Math.abs(this.elevators[i].elvImg.offsetTop - pos);
          if (dist && _dist < dist) {
            dist = _dist;
            closestElv = i;
        }
      }
    }
    return closestElv;
  };

  updateElvPos = (floor:Floor, elevator: Elevator) => {
    const floorPos = floor.floorDiv.offsetTop
    let elvPos = elevator.elvImg.offsetTop;
    const id = setInterval(() => {
      if (floorPos === elvPos) {
        clearInterval(id);
        elevator.setAvailable();
        this.updateFloorBtn(floor)
        floor.isPressed = false;
      } else {
        if (elvPos > floorPos) elvPos--
        else elvPos++
        elevator.elvImg.style.top = `${elvPos}px`;
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
    this.BuildingDivElement.appendChild(div);
    return div;
  }

  createElevatorsDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.style.height = `${this.buildingHeight * 118}px`;
    div.classList.add("elv-area");
    this.BuildingDivElement.appendChild(div);
    return div;
  }
}
