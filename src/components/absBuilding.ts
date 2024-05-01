/**
 * Abstract class representing a building component with methods to create parent and child elements.
 * @abstract
 */
export abstract class BuildingComponent {
  /**
   * Creates a parent element with the specified class name.
   * @param {string} className - The class name for the parent element.
   * @returns {HTMLElement} The created parent element.
   */
  createParentElement = (className: string): HTMLDivElement => {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
  };
  /**
   * Abstract method to be implemented by subclasses for creating child elements.
   * @abstract
   * @param {string} className - The class name for the child element.
   * @returns {HTMLElement} The created child element.
   */
  abstract createChildElement(className: string): HTMLElement;
}
