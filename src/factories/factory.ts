import { Building } from "./Building";
import { Floor } from "./Floor";
import { Elevator } from "./Elevator";

const FLOORS = 15;
const ELEVATORS = 2;

// Function to generate buildings
export function buildingsFactory(numBuildings: number) {
  const container = document.getElementById(
    "container"
  ) as HTMLDivElement | null;
  if (!container) return;

  for (let i = 0; i < numBuildings; i++) {
    const building = new Building(FLOORS);
    container.appendChild(building.BuildingDivElement);
    floorsFactory(building, FLOORS); // Generate 10 floors for each building
    elevatorFactory(building, ELEVATORS); // Generate 2 elevators for each building
  }
}

// Function to generate floors
function floorsFactory(building: Building, numFloors: number) {
  for (let i = numFloors; i >= 0; i--) {
    const floor = new Floor(i);
    // building.floors.push(floor);
    building.floorsDivElement.appendChild(floor.floorDiv);
  }
}

// Function to generate elevators
function elevatorFactory(building: Building, numElevators: number) {
  for (let i = 1; i <= numElevators; i++) {
    const elevator = new Elevator(FLOORS);
    building.elevators.push(elevator);
    building.ElevatorsDivElement.appendChild(elevator.elvDiv);
  }
}
