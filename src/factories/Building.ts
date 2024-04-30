import { Elevator } from "./Elevator";
import { Floor } from "./Floor";
import { Timer } from "../types";



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
      this.updateFloorBtn(floor);
      this.requestStack.push(floor);
    }
  };

  stackManager = () => {
    const intervalId = setInterval(() => {
      if (
        this.requestStack.length > 0 &&
        this.elevators.some((elevator) => elevator.isAvailable)
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
    const time = Math.abs(floor.floorNumber - elevator.atFloor) / 2;
    console.log(`timer for elevator to arrive: ${time} seconds`);
    this.updateElvPos(floor, elevator, time);
  };

  updateFloorBtn = (floor: Floor) => {
    floor.floorBtn.classList.toggle("clicked");
    floor.isPressed = !floor.isPressed;
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

  convertTime = (n: number): Timer => {
    if (Number.isInteger(n)) {
      return { sec: n, ms: 0 };
    } else {
      return { sec: Math.floor(n), ms: 30 };
    }
  };

  updateElvPos = (floor: Floor, elevator: Elevator, time: number) => {
    const floorPos = floor.floorDiv.offsetTop;
    let elevatorPos = elevator.elvImg.offsetTop;
    // let { sec, ms } = this.convertTime(time);
    time = Math.ceil(time)
    floor.timerDiv.textContent = `${time.toString().padStart(2, "0")}`
    const timerId = setInterval(() => {
      time--
      // ms--;
      // if (ms === 0) {
      //   sec--;
      //   ms = 60;
      // }
      // const formattedSec = sec.toString().padStart(2, "0");
      // const formattedMs = ms.toString().padStart(2, "0").slice(0, 2);
      // floor.timerDiv.textContent = `${formattedSec}:${formattedMs}`;
      floor.timerDiv.textContent = `${time.toString().padStart(2, "0")}`
    }, 1400);
    const id = setInterval(() => {
      if (floorPos === elevatorPos) {
        clearInterval(id);
        // floor.timerDiv.textContent = `00:00`
        clearInterval(timerId);
        this.playSound();
        elevator.atFloor = floor.floorNumber;
        this.updateFloorBtn(floor);
        floor.timerDiv.textContent = '00'
        setTimeout(() => {
          elevator.setAvailable();
        }, 2000);
      } else {
        if (elevatorPos > floorPos) {
          elevatorPos--;
        } else {
          elevatorPos++
        };
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
