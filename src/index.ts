import { buildingsFactory } from "./factory";
import { BuildingInstructions as BT } from "./utils/types";

/**
 * An asynchronous function that loads building instructions from a JSON file with the specified format:
 * {
 *   "buildings":[{
 *       "numFloors":15,
 *       "numElevators":3
 *   },{
 *       "numFloors":10,
 *       "numElevators":2
 *   }]
 * }
 *
 * @returns {Promise<Array<BT> | null>} A promise that resolves with an array of building instructions (BT) or null if an error occurs.
 */
async function loadBuildingInstructions(): Promise<Array<BT> | null> {
  try {
    const response = await fetch("/buildings.json");
    const data = await response.json();
    return data.buildings as BT[];
  } catch (error) {
    console.error("Error loading building instructions:", error);
    return null;
  }
}

/**
 * this event is fired when the html is loaded.
 * the loadBuildingsInstruction function is called to get the buildings instructions
 * and if the instructions are valid it will call the buildingsFactory to generate the buildings
 */
document.addEventListener("DOMContentLoaded", function () {
  loadBuildingInstructions().then((instruction) => {
    console.log(instruction);
    if (instruction) {
      buildingsFactory(instruction);
    }
  });
});
