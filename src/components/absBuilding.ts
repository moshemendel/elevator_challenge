export abstract class BuildingComponent {
  // abstract createParentElement(className: string): HTMLElement;
  createParentElement = (className: string) => {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
  };
  abstract createChildElement(className: string): HTMLElement;
}
