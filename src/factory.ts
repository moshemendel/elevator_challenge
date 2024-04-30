import { Building } from "./components/Building";
import { Floor } from "./components/Floor";
import { Elevator } from "./components/Elevator";
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

  const maxHeight = getMaxHeight(buildings) * 118;
  console.log("maxHeight ", maxHeight);
  for (const { numFloors, numElevators } of buildings) {
    const building = new Building(numFloors, numElevators);
    building.buildingDivElement.style.minHeight = `${maxHeight}px`;
    container.appendChild(building.buildingDivElement);
    floorsFactory(building, numFloors);
    elevatorsFactory(building, numElevators, numFloors);
  }
}

// Function to generate floors
function floorsFactory(building: Building, numFloors: number) {
  for (let i = numFloors; i >= 0; i--) {
    const floor = new Floor(i);
    const { floorBtn } = floor;
    if (floorBtn) {
      floorBtn.addEventListener("click", () => {
        building.handleClick(floor);
      });
    }
    building.floorsDivElement.appendChild(floor.floorDiv);
  }
}

// Function to generate elevators
function elevatorsFactory(
  building: Building,
  numElevators: number,
  numFloors: number
) {
  for (let i = 1; i <= numElevators; i++) {
    const elevator = new Elevator(numFloors);
    building.elevators.push(elevator);
    building.elevatorsDivElement.appendChild(elevator.elvDiv);
  }
}

const getMaxHeight = (buildings: BT[]) => {
  let maxHeight = 0;
  for (const { numFloors } of buildings) {
    if (numFloors && numFloors > maxHeight) {
      maxHeight = numFloors;
    }
  }
  return maxHeight;
};
