import { Component } from "./base-component";
import { validate } from "../util/validation";
import { Validatable } from "../interface/validate";
import { autobind as Autobind } from "../decorators/autobind";
import globalStore from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  /**
   * declare property
   */
  titleInputElement: HTMLInputElement;
  descInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    /**
     * Getting Input
     */
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );
    this.descInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );
    /**
     *  Register Method for Initial
     */
    this.configure();
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  renderContent() {}

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      // console.log("userInput => ", userInput);
      this.clearInputs();
    }
  }
  private getUserInput(): [string, string, number] | void {
    const titleValue = this.titleInputElement.value;
    const descriptionValue = this.descInputElement.value;
    const peopleValue = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: titleValue,
      required: true
    };
    const descriptionValidatable: Validatable = {
      value: descriptionValue,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: +peopleValue,
      required: true,
      min: 1,
      max: 3
    };
    if (
      validate(titleValidatable) &&
      validate(descriptionValidatable) &&
      validate(peopleValidatable)
    ) {
      globalStore.addProject(titleValue, descriptionValue, +peopleValue);
      return [titleValue, descriptionValue, +peopleValue];
    } else {
      window.alert("Invalid Entry Input");
      return;
    }
  }
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}
