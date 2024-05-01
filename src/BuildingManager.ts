import { Building } from "./components/Building";
import { Floor } from "./components/Floor";
import { Elevator } from "./components/Elevator";

export class BuildingManager {
  building: Building;
  elevators: Elevator[] = [];
  requestStack: Floor[] = [];
  reqInProgress: boolean = false;
  dingSound: string = "ding.mp3";

  constructor(building: Building) {
    this.building = building;
    this.stackManager();
  }

  handleClick = (floor: Floor) => {
    if (!floor.isPressed) {
      floor.updateFloorBtn();
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
    const elevator = this.getClosestElv(floor.floorDiv.offsetTop);
    elevator.setAvailable();
    const countdown = Math.abs(floor.floorNumber - elevator.atFloor) / 2;
    console.log(`timer for elevator to arrive: ${countdown} seconds`);
    floor.timer.setCountdown(countdown);
    this.updateElvPos(floor, elevator);
  };

  getClosestElv = (floorTop: number) => {
    let closestElv: number = 0;
    // the maximum distance between a floor and a elevator is for the last floor and the elevator in 1st floor
    let minDist = this.building.buildingHeight + this.building.floorPixels;
    for (let i = 0; i < this.elevators.length; i++) {
      const elevator = this.elevators[i];
      if (elevator.isAvailable) {
        const dist = Math.abs(elevator.elvImg.offsetTop - floorTop);
        if (dist < minDist) {
          minDist = dist;
          closestElv = i;
        }
      }
    }
    return this.elevators[closestElv];
  };

  updateElvPos = (floor: Floor, elevator: Elevator) => {
    const floorTop = floor.getFloorTop();
    let elvTop = elevator.getElvTop();

    const id = setInterval(() => {
      if (floorTop === elvTop) {
        clearInterval(id);
        floor.timer.stopCountdown();
        this.playSound();
        elevator.setFloor(floor.floorNumber);
        floor.updateFloorBtn();
        setTimeout(() => {
          elevator.setAvailable();
        }, 2000);
      } else {
        if (elvTop > floorTop) {
          elvTop--;
        } else {
          elvTop++;
        }
        elevator.setTopPosition(elvTop);
      }
    }, 4); // this interval will move the elvator at time of one second between two floors
  };

  playSound = () => {
    new Audio(this.dingSound).play();
  };
}
