import { Building } from "./components/Building";
import { Floor } from "./components/Floor";
import { Elevator } from "./components/Elevator";
import { Timer } from "./utils/types";

export class BuildingManager {
  buildings: Building;
  elevators: Elevator[] = [];
  requestStack: Floor[] = [];
  reqInProgress: boolean = false;
  dingSound: string = "ding.mp3";

  constructor(building: Building) {
    this.buildings = building;
    this.stackManager();
  }

  handleClick = (floor: Floor) => {
    if (!floor.isPressed) {
      this.updateFloorBtn(floor);
      this.requestStack.push(floor);
    }
  };

  stackManager = () => {
    setInterval(() => {
      if (
        this.requestStack.length > 0 &&
        this.elevators.some((elevator) => elevator.isAvailable)
      ) {
        const floor = this.requestStack.shift() as Floor;
        console.log(`Request stack: handling floor ${floor.floorNumber}`);
        this.processRequest(floor);
      }
    }, 10);
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
    let minDist = this.buildings.buildingHeight + 100;
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

  updateElvPos = (floor: Floor, elevator: Elevator, time: number) => {
    const floorPos = floor.floorDiv.offsetTop;
    let elevatorPos = elevator.elvImg.offsetTop;
    time = Math.floor(time);
    floor.timerDiv.textContent = `${time.toString().padStart(2, "0")}`;
    const timerId = setInterval(() => {
      time--;
      floor.timerDiv.textContent = `${time.toString().padStart(2, "0")}`;
    }, 1000);
    const id = setInterval(() => {
      console.log("floorTop:", floorPos, "elevatorTop:", elevatorPos);
      if (floorPos === elevatorPos) {
        clearInterval(id);
        clearInterval(timerId);
        this.playSound();
        elevator.atFloor = floor.floorNumber;
        this.updateFloorBtn(floor);
        floor.timerDiv.textContent = "00";
        setTimeout(() => {
          elevator.setAvailable();
        }, 2000);
      } else {
        if (elevatorPos > floorPos) {
          elevatorPos--;
        } else {
          elevatorPos++;
        }
        elevator.elvImg.style.top = `${elevatorPos}px`;
      }
    }, 4); // this interval will move the elvator at time of one second between two floors
  };

  playSound = () => {
    new Audio(this.dingSound).play();
  };
}
