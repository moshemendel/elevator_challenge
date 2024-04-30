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

  const buildingsContainerTop = getBuildingsContainerTop();
  console.log("buildingsContainerTop", buildingsContainerTop);

  for (const { numFloors, numElevators } of buildings) {
    const building = new Building(numFloors);
    const manager = new BuildingManager(building);
    container.appendChild(building.buildingDivElement);

    floorsFactory(manager, building, numFloors);
    let bottom = building.getBuildingFirstElementBottom("floor");
    console.log("floor bottom:", bottom);

    elevatorsFactory(manager, building, numElevators, bottom);
    bottom = building.getBuildingFirstElementBottom("elevator");
    console.log("elevator bottom:", bottom);
  }
}

// Function to generate floors
function floorsFactory(
  manager: BuildingManager,
  building: Building,
  numFloors: number
) {
  for (let i = numFloors; i >= 0; i--) {
    const floor = new Floor(i);
    const { floorBtn } = floor;
    if (floorBtn) {
      floorBtn.addEventListener("click", () => {
        manager.handleClick(floor);
      });
    }
    building.floorsDivElement.appendChild(floor.floorDiv);
  }
}

// Function to generate elevators
function elevatorsFactory(
  manager: BuildingManager,
  building: Building,
  numElevators: number,
  numFloors: number
) {
  for (let i = 1; i <= numElevators; i++) {
    const elevator = new Elevator(numFloors);
    building.elevatorsDivElement.appendChild(elevator.elvDiv);
    manager.elevators.push(elevator);
  }
}

const getBuildingsContainerTop = () => {
  const element = document.getElementById("buildingsContainer");
  if (element) {
    return Math.floor(element.getBoundingClientRect().y);
  }
  return 0;
};
