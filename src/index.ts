import { buildingsFactory } from "./factories/factory";
import { Building as BT } from "./types";

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

// Entry point
document.addEventListener("DOMContentLoaded", function () {
  loadBuildingInstructions().then((instruction) => {
    console.log(instruction);
    if (instruction) {
      buildingsFactory(instruction);
    }
  });
  // buildingsFactory(instruction); // Generate 3 buildings
});
