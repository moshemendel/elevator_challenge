import { Building } from "./components/Building";
import { Floor } from "./components/Floor";
import { Elevator } from "./components/Elevator";

/**
 * Manages the operation of elevators within a building, handling requests and elevator movements.
 * @class
 */
export class BuildingManager {
  /**
   * @property {building}: The building associated with the manager.
   * @property {elevators}: Array of elevators managed by the building manager.
   * @property {requestStack}: Stack of floor requests to be processed by the elevators.
   * @property {isReqInProgress}: Flag indicating if a request is currently in progress.
   * @property {dingSound}: The sound file to play when an elevator reaches a floor.
   */
  building: Building;
  elevators: Elevator[] = [];
  requestStack: Floor[] = [];
  isReqInProgress: boolean = false;
  dingSound: string = "ding.mp3";

  /**
   * Creates a new BuildingManager instance.
   * @constructor
   * @param {Building} building - The building to manage.
   */
  constructor(building: Building) {
    this.building = building;
    this.stackManager();
  }

  /**
   * Handles the click event on a floor button, updating the request stack.
   * @param {Floor} floor - The floor associated with the clicked button.
   */
  handleClick = (floor: Floor) => {
    if (!floor.isPressed) {
      floor.updateFloorBtn();
      this.requestStack.push(floor);
    }
  };

  /**
   * Manages the processing of floor requests from the request stack.
   */
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

  /**
   * Processes a floor request by assigning an available elevator and updating positions.
   * @param {Floor} floor - The floor associated with the request.
   */
  processRequest = (floor: Floor) => {
    const elevator = this.getClosestElv(floor.floorDiv.offsetTop);
    elevator.setAvailable();
    const countdown = Math.abs(floor.floorNumber - elevator.atFloor) / 2;
    console.log(`timer for elevator to arrive: ${countdown} seconds`);
    floor.timer.setCountdown(countdown);
    this.updateElvPos(floor, elevator);
  };

  /**
   * Determines the closest available elevator to a floor based on vertical distance.
   * @param {number} floorTop - The top position of the floor.
   * @returns {Elevator} The closest available elevator.
   */
  getClosestElv = (floorTop: number) => {
    let closestElv: number = 0;
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

  /**
   * Updates the position of the elevator to reach the specified floor.
   * @param {Floor} floor - The target floor.
   * @param {Elevator} elevator - The elevator to move.
   */
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
    }, 4);
  };

  /**
   * Plays the ding sound when an elevator reaches a floor.
   */
  playSound = () => {
    new Audio(this.dingSound).play();
  };
}
