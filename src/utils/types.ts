/**
 * Interface representing building instructions with the number of floors and elevators.
 * @interface
 */
export interface BuildingInstructions {
  /**
   * @property {numFloors}: The number of floors in the building.
   * @property {numElevators}: The number of elevators in the building.
   */
  numFloors: number;
  numElevators: number;
}
