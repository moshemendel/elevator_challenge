/**
 * Factory functions to generate buildings, floors, and elevators.
 * @module
 */

import { Building } from "./components/Building";
import { Floor } from "./components/Floor";
import { Elevator } from "./components/Elevator";
import { BuildingManager } from "./BuildingManager";
import { BuildingInstructions as BT } from "./utils/types";

/**
 * Generates buildings based on the provided configuration.
 * @param {BT[]} buildings - Array of building configurations.
 */
export function buildingsFactory(buildings: BT[]) {
  console.log("buildingsFactory", buildings);
  const container = document.getElementById(
    "buildingsContainer"
  ) as HTMLDivElement | null;
  if (!container) {
    return;
  }
  const buildingsManagers: BuildingManager[] = [];
  for (const { numFloors, numElevators } of buildings) {
    console.log(
      "Building: numFloors: " + numFloors,
      "num elevator" + numElevators
    );
    const building = new Building(numFloors);
    const manager = new BuildingManager(building, numElevators);
    container.appendChild(building.buildingDiv);

    floorsFactory(manager, building);
    buildingsManagers.push(manager);
  }

  for (const manager of buildingsManagers) {
    const { building, numElevators } = manager;
    let elvTop = building.getElevatorTopPos();
    console.log("elvTop position", elvTop);
    elevatorsFactory(manager, building, numElevators, elvTop);
  }
}

/**
 * Generates floors for a building.
 * @param {BuildingManager} manager - The building manager instance.
 * @param {Building} building - The building instance.
 */ function floorsFactory(manager: BuildingManager, building: Building) {
  for (let floorNum = building.numFloors; floorNum >= 0; floorNum--) {
    const floor = new Floor(floorNum);
    const { floorBtn, floorDiv } = floor;
    // add event listener to floor button and connect it to the manager handler
    floorBtn?.addEventListener("click", () => {
      manager.handleClick(floor);
    });
    building.addFloor(floorDiv);
  }
}

/**
 * Generates elevators for a building.
 * @param {BuildingManager} manager - The building manager instance.
 * @param {Building} building - The building instance.
 * @param {number} numElevators - The number of elevators to generate.
 * @param {number} elvTop - The top position for the elevators.
 */ function elevatorsFactory(
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
