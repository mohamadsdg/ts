import { Project, ProjectStatus } from "../models/project.js";

type subscribeType = {
  [key: string]: Function[];
};

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
export class Store extends GlobalStore {
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
  public moveProject(id: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === id);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.publish("data_list", this.projects.slice());
    }
  }
}
// store Project
const globalStore = Store.getInstance();

export default globalStore;
