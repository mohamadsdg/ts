/**
 * Decorator
 */
function Autobind(_: any, _2: string, descript: PropertyDescriptor) {
  const originalMethod = descript.value;
  const adjDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      return originalMethod.bind(this);
    }
  };
  // console.log(adjDescriptor);
  return adjDescriptor;
}
class ProjectInput {
  /**
   * declare property
   */
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    /**
     * bind themplate to app
     */
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
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
    this.attach();
    this.configure();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value);
  }
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const prjInput = new ProjectInput();
