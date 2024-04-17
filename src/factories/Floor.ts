export class Floor {
  floorNumber: number;
  floorDiv: HTMLDivElement;
  floorBtn: HTMLButtonElement;
  timerDiv: HTMLDivElement;
  isPressed: boolean = false;

  constructor(floorNumber: number) {
    this.floorNumber = floorNumber;
    this.floorDiv = this.createFloorElement();
    this.floorBtn = this.createFloorBtnElement();
    this.timerDiv = this.createTimerDivElement();

    this.floorBtn.addEventListener("click", this.onClick);
  }

  onClick = () => {
    if (!this.isPressed) {
      const event = new CustomEvent("floorClicked", {
        detail: this,
      });
      document.dispatchEvent(event);
      this.floorBtn.classList.add("clicked");
      this.isPressed = true;
    }
  };

  createFloorElement = (): HTMLDivElement => {
    const floor = document.createElement("div");
    floor.classList.add("floor");
    return floor;
  };

  createFloorBtnElement = (): HTMLButtonElement => {
    const button = document.createElement("button");
    button.textContent = String(this.floorNumber);
    button.classList.add("metal", "linear", "floor-btn");
    // Append the button to the floor
    this.floorDiv.appendChild(button);
    return button;
  };

  createTimerDivElement = () => {
    const timer = document.createElement("div");
    timer.textContent = String("00:00");
    timer.classList.add("metal", "timer");
    this.floorDiv.appendChild(timer);
    return timer;
  };
}
