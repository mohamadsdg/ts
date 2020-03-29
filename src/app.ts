/// <reference path="component/project-input.ts" />
/// <reference path="component/project-list.ts" />
namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
