/// <reference path="./base-component.ts" />
/// <reference path="../interface/drag-drop.ts" />
/// <reference path="../decorators/autobind.ts" />

namespace App {
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private projectItem: Project;
    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.projectItem = project;

      this.renderContent();
      this.configure();
    }
    get persons() {
      if (this.projectItem.people === 1) {
        return "1 person";
      }
      return `${this.projectItem.people} persons`;
    }
    @Autobind
    dragStartHandler(e: DragEvent) {
      e.target!.style.opacity = 0.5;
      e.dataTransfer!.setData("text/plain", this.projectItem.id);
      e.dataTransfer!.effectAllowed = "move";
    }
    dragEndHandler(e: DragEvent) {
      e.target!.style.opacity = 1;
      console.log("dragg End");
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
      this.element.querySelector("h2")!.textContent = this.projectItem.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector(
        "p"
      )!.textContent = this.projectItem.description;
    }
  }
}
