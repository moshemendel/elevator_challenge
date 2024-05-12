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
  createElement = (tag: string, className: string | Array<string>): HTMLElement => {
    const element = document.createElement(tag);
    if (typeof className === "string") {
      element.classList.add(className);
    } else {
      element.classList.add(...className);
    }
    return element;
  };
  

  /**
   * Abstract method to be implemented by subclasses for creating child elements.
   * @abstract
   * @param {string} className - The class name for the child element.
   * @returns {HTMLElement} The created child element.
   */
  abstract createChildElement(className: string): HTMLElement;
}
