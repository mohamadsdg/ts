/**
 * custom Type
 */
type subscribeType = {
  [key: string]: Function[];
};
enum ProjectStatus {
  ACTIVE = "active",
  FINISHED = "finished"
}
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
 * base class
 */
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
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
class GlobalStore {
  private subscribers: subscribeType = {};

  public subscribe(eventName: string, callback: Function) {
    if (!Array.isArray(this.subscribers[eventName])) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
  }
  protected publish<T extends object>(eventName: string, data: T) {
    if (!Array.isArray(this.subscribers[eventName])) {
      return;
    }
    for (const callback of this.subscribers[eventName]) {
      callback(data);
    }
  }
}
class Store extends GlobalStore {
  private projects: Project[] = [];
  private static instance: Store;
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Store();
    return this.instance;
  }
  public addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.ACTIVE
    );
    this.projects.push(newProject);

    // feed callback subscribe
    this.publish("data_list", this.projects.slice());
  }
}
// store Project
const globalStore = Store.getInstance();

/**
 * Class
 */
// every component is in the end a renderable object which has some functionalities that allow us to render it
// and then the concrete instances or the inherited classes
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    themplateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElmId?: string
  ) {
    /**
     * bind themplate to app
     */
    this.templateElement = document.getElementById(
      themplateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElmId) this.element.id = newElmId;

    /**
     *  Register Method for Initial
     */
    this.attach(insertAtStart);
  }
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract configure(): void;
  abstract renderContent(): void;
}
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  /**
   * declare property
   */
  private assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    /**
     *  Register Method for Initial
     */
    this.configure();
    this.renderContent();
  }
  configure() {
    globalStore.subscribe("data_list", (value: Project[]) => {
      const relevantProject = value.filter(prj => prj.status === this.type);
      this.assignedProjects = relevantProject;
      this.renderProject();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type} PROJECTS`.toLocaleUpperCase();
  }
  private renderProject() {
    const ulElmn = this.element.querySelector(
      `#${this.type}-projects-list`
    )! as HTMLUListElement;
    ulElmn.textContent = "";
    for (const project of this.assignedProjects) {
      const listElm = document.createElement("li");
      listElm.textContent = project.title;
      ulElmn.appendChild(listElm);
    }
  }
}

const prjInput = new ProjectInput();
const prjList = new ProjectList("active");
const prjList1 = new ProjectList("finished");
