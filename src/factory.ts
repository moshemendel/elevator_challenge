import { Building } from "./components/Building";
import { Floor } from "./components/Floor";
import { Elevator } from "./components/Elevator";
import { BuildingManager } from "./BuildingManager";
import { BuildingInstructions as BT } from "./utils/types";

// Function to generate buildings
export function buildingsFactory(buildings: BT[]) {
  console.log("buildingsFactory", buildings);
  const container = document.getElementById(
    "buildingsContainer"
  ) as HTMLDivElement | null;
  if (!container) {
    return;
  }

  for (const { numFloors, numElevators } of buildings) {
    const building = new Building(numFloors);
    const manager = new BuildingManager(building);
    container.appendChild(building.buildingDiv);

    floorsFactory(manager, building);
    let elvTop = building.getElevatorTopPos("floor");
    elevatorsFactory(manager, building, numElevators, elvTop);
  }
}

// Function to generate floors
function floorsFactory(manager: BuildingManager, building: Building) {
  for (let floorNum = building.numFloors; floorNum >= 0; floorNum--) {
    const floor = new Floor(floorNum);
    const { floorBtn } = floor;
    floorBtn?.addEventListener("click", () => {
      manager.handleClick(floor);
    });
    // building.floorsDivElement.appendChild
    building.addFloor(floor.floorDiv);
  }
}

// Function to generate elevators
function elevatorsFactory(
  manager: BuildingManager,
  building: Building,
  numElevators: number,
  elvTop: number
) {
  for (let i = 1; i <= numElevators; i++) {
    const elevator = new Elevator(elvTop);
    building.addElevator(elevator.elvDiv);
    manager.elevators.push(elevator);
  }
}
