import { Component } from "./base-component.js";
import { autobind as Autobind } from "../decorators/autobind.js";
import { DragTarget } from "../interface/drag-drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import { ProjectItem } from "./project-item.js";
import globalStore from "../state/project-state.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
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
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type} PROJECTS`.toLocaleUpperCase();
  }

  @Autobind
  dropHandler(e: DragEvent) {
    const prjId = e.dataTransfer!.getData("text/plain");
    globalStore.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
    );
  }
  @Autobind
  dragOverHandler(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer!.types[0] === "text/plain") {
      e.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  private renderProject() {
    const ulElmn = this.element.querySelector(
      `#${this.type}-projects-list`
    )! as HTMLUListElement;
    ulElmn.textContent = "";
    for (const project of this.assignedProjects) {
      // const listElm = document.createElement("li");
      // listElm.textContent = project.title;
      // ulElmn.appendChild(listElm);
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }
}
