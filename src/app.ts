/**
 * subscription pattern inside of our state we manage a list of listeners So a list of functions in the end
 * which should be called whenever something changes (It's an array of functions of function references right)
 * ******
 * The idea is that whenever something changes like (body addProject) when we add a new project we call all listener functions
 * ******
 */
/**
 * Global Store
 */
type subscribeType = {
  [key: string]: Function[];
};
class Store {
  public projects: any[] = [];
  private static instance: Store;
  private subscribers: subscribeType = {};
  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Store();
    return this.instance;
  }
  public subscribe(eventName: string, callback: Function) {
    if (!Array.isArray(this.subscribers[eventName])) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
  }
  public publish(eventName: string, data: any) {
    if (!Array.isArray(this.subscribers[eventName])) {
      return;
    }
    for (const callback of this.subscribers[eventName]) {
      callback(data);
    }
  }

  public addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople
    };
    this.projects.push(newProject);

    // feed callback subscribe
    this.publish("data_list", this.projects.slice());
  }
}
const globalStore = Store.getInstance();

/**
 * Interface
 */
interface Validatable {
  value: string | number;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}
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
/**
 * Utils
 */
function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.maxLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.minLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (validatableInput.max && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  if (validatableInput.min && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  return isValid;
}

/**
 * Class
 */
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
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      // console.log("userInput => ", userInput);
      this.clearInputs();
    }
  }
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
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
class ProjectList {
  /**
   * declare property
   */
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[] = [];

  constructor(private type: "active" | "finished") {
    /**
     * bind themplate to app
     */
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    globalStore.subscribe("data_list", (value: any[]) => {
      this.assignedProjects = value;
      this.renderProject();
    });

    /**
     *  Register Method for Initial
     */
    this.attach();
    this.renderContent();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
  private renderProject() {
    const ulElmn = this.element.querySelector(
      `#${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const project of this.assignedProjects) {
      const listElm = document.createElement("li");
      listElm.textContent = project.title;
      ulElmn.appendChild(listElm);
    }
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type} PROJECTS`.toLocaleUpperCase();
  }
}

const prjInput = new ProjectInput();
const prjList = new ProjectList("active");
const prjList1 = new ProjectList("finished");
