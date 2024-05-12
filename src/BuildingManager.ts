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
   * @property {numElevators}: Number of elevators.
   * @property {requestStack}: Stack of floor requests to be processed by the elevators.
   * @property {isReqInProgress}: Flag indicating if a request is currently in progress.
   * @property {dingSound}: The sound file to play when an elevator reaches a floor.
   */
  building: Building;
  elevators: Elevator[] = [];
  numElevators: number;
  requestStack: Floor[] = [];
  isReqInProgress: boolean = false;
  dingSound: string = "ding.mp3";

  /**
   * Creates a new BuildingManager instance.
   * @constructor
   * @param {Building} building - The building to manage.
   */
  constructor(building: Building, numElevators: number) {
    this.building = building;
    this.numElevators = numElevators;
    this.stackManager();
  }

  /**
   * Handles the click event on a floor button, updating the request stack.
   * @param {Floor} floor - The floor associated with the clicked button.
   */
  handleClick = (floor: Floor) => {
    if (!floor.isPressed && !this.isElvAtFloor(floor.number)) {
      // this.isFloorOccupied()
      floor.updateBtn();
      this.requestStack.push(floor);
    }
  };

  /**
   * check if elevator is already at floor so that it can't call another elveator
   * @param {number} floorNumber - The floor number associated with the clicked button.
   * @returns {boolean} True if there is elevator at floor, false otherwise.
   */
  isElvAtFloor = (floorNumber: number): boolean => {
    for (const elevator of this.elevators) {
      if (floorNumber === elevator.floor) {
        return true;
      }
    }
    return false;
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
        console.log(`Request stack: handling floor ${floor.number}`);
        this.processRequest(floor);
      }
    }, 10);
  };

  /**
   * Processes a floor request by assigning an available elevator and updating positions.
   * @param {Floor} floor - The floor associated with the request.
   */
  processRequest = (floor: Floor) => {
    const elevator = this.getClosestElv(floor.top);
    elevator.isAvailable = false;
    elevator.freeFloor();
    const countdown = Math.abs(floor.number - elevator.floor) / 2;
    console.log(`timer for elevator to arrive: ${countdown} seconds`);
    floor.timer.setCountdown(countdown);
    this.updateElvPos(floor, elevator);
  };

  /**
   * Determines the closest available elevator to a floor based on vertical distance.
   * @param {number} floorTop - The top position of the floor.
   * @returns {Elevator} The closest available elevator.
   */
  getClosestElv = (floorTop: number): Elevator => {
    let closestElv: number = 0;
    let minDist = this.building.height; // + this.building.floorPixels;
    for (let i = 0; i < this.elevators.length; i++) {
      const elevator = this.elevators[i];
      if (elevator.isAvailable) {
        const dist = Math.abs(elevator.top - floorTop);
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
    const floorTop = floor.top;
    let elvTop = elevator.top;

    const id = setInterval(() => {
      if (floorTop === elvTop) {
        clearInterval(id);
        floor.timer.stopCountdown();
        this.playSound();
        elevator.floor = floor.number;
        floor.updateBtn();
        setTimeout(() => {
          elevator.isAvailable = true;
        }, 2000);
      } else {
        if (elvTop > floorTop) {
          elvTop--;
        } else {
          elvTop++;
        }
        elevator.top = elvTop;
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
