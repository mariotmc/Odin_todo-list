const Project = (title) => {
  title: title;
  let tasks = [];

  return { title, tasks };
};

const Task = (title, dueDate, priority) => {
  return { title, dueDate, priority };
};

const Lists = (() => {
  let projectsList = [];

  return { projectsList };
})();

const Display = (() => {
  const main = document.querySelector("main");

  const projectPromptInterface = () => {
    const projectFormContainer = document.createElement("div");
    projectFormContainer.classList.add("modal");
    const projectForm = document.createElement("form");
    projectForm.classList.add("modal-content");
    const projectFormLabel = document.createElement("label");
    projectFormLabel.textContent = "New Project";
    const projectFormInput = document.createElement("input");
    projectFormInput.setAttribute("type", "text");
    projectFormInput.required = true;
    projectFormInput.classList.add("project-name-input");
    projectForm.appendChild(projectFormLabel);
    projectForm.appendChild(projectFormInput);
    projectFormContainer.appendChild(projectForm);

    main.appendChild(projectFormContainer);

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let userInputProject = document.querySelector(".project-name-input");

      const project = Project(userInputProject.value);
      Lists.projectsList.push(project);

      Data.updateLocalStorage();

      clearInterface();
      allProjectsInterface();
    });
  };

  const allProjectsInterface = () => {
    const interfaceContainer = document.createElement("div");
    interfaceContainer.classList.add("interface-container");
    const interfaceHeading = document.createElement("h1");
    interfaceHeading.textContent = "Projects";
    const newProjectButton = document.createElement("button");
    newProjectButton.classList.add("fas");
    newProjectButton.classList.add("fa-plus");
    newProjectButton.textContent = "Add Project";
    const projects = document.createElement("ul");

    Lists.projectsList.forEach((element) => {
      const item = document.createElement("li");
      item.classList.add("item");
      item.classList.add("fas");
      item.classList.add("fa-list");
      item.textContent = element.title;

      item.addEventListener("click", (e) => {
        clearInterface();
        currentProjectInterface(e.target.textContent);
      });

      projects.appendChild(item);
    });

    newProjectButton.addEventListener("click", () => {
      projectPromptInterface();
    });

    interfaceContainer.appendChild(interfaceHeading);
    interfaceContainer.appendChild(newProjectButton);
    interfaceContainer.appendChild(projects);
    main.appendChild(interfaceContainer);
  };

  const currentProjectInterface = (projecTitle) => {
    const interfaceContainer = document.createElement("div");
    interfaceContainer.classList.add("interface-container");
    interfaceContainer.classList.add("tasks-container");

    const interfaceHeading = document.createElement("h1");
    interfaceHeading.textContent = projecTitle;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const projectsButton = document.createElement("button");
    projectsButton.textContent = "All Projects";
    projectsButton.addEventListener("click", () => {
      clearInterface();
      allProjectsInterface();
    });

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "New Task";
    newTaskButton.addEventListener("click", () => {
      const taskFormContainer = document.createElement("div");
      taskFormContainer.classList.add("modal");

      const taskFormLabel = document.createElement("label");
      taskFormLabel.textContent = "New Task";

      const taskForm = document.createElement("form");
      taskForm.classList.add("task-form");
      taskForm.classList.add("modal-content");

      const taskTitle = document.createElement("input");
      taskTitle.setAttribute("type", "text");
      taskTitle.setAttribute("placeholder", "Title");
      taskTitle.required = true;

      const taskDueDate = document.createElement("input");
      taskDueDate.setAttribute("type", "date");
      taskDueDate.required = true;

      const taskPriority = document.createElement("select");
      taskPriority.setAttribute("name", "priority");
      taskPriority.required = true;
      taskPriorityPlaceholder = document.createElement("option");
      taskPriorityPlaceholder.textContent = "Priority";
      taskPriorityPlaceholder.style.display = "none";
      taskPriorityLow = document.createElement("option");
      taskPriorityLow.setAttribute("value", "!");
      taskPriorityLow.textContent = "Low";
      taskPriorityMedium = document.createElement("option");
      taskPriorityMedium.setAttribute("value", "!!");
      taskPriorityMedium.textContent = "Medium";
      taskPriorityHigh = document.createElement("option");
      taskPriorityHigh.setAttribute("value", "!!!");
      taskPriorityHigh.textContent = "High";
      taskPriority.appendChild(taskPriorityPlaceholder);
      taskPriority.appendChild(taskPriorityLow);
      taskPriority.appendChild(taskPriorityMedium);
      taskPriority.appendChild(taskPriorityHigh);

      const taskSubmitButton = document.createElement("button");
      taskSubmitButton.setAttribute("type", "submit");
      taskSubmitButton.textContent = "ADD";

      taskForm.appendChild(taskFormLabel);
      taskForm.appendChild(taskTitle);
      taskForm.appendChild(taskDueDate);
      taskForm.appendChild(taskPriority);
      taskForm.appendChild(taskSubmitButton);
      taskFormContainer.appendChild(taskForm);

      main.appendChild(taskFormContainer);

      taskSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (taskTitle.value != "" && taskDueDate.value != "" && taskPriority.value != "") {
          const task = Task(taskTitle.value, taskDueDate.value, taskPriority.value);

          Lists.projectsList.map((element) => {
            if (element.title === projecTitle) {
              element.tasks.push(task);

              taskTitle.value = "";
              taskDueDate.value = "";
              taskPriority.value = "";

              taskForm.remove();
            }
          });
          Data.updateLocalStorage();

          const itemContainer = document.createElement("li");
          itemContainer.classList.add("item");
          itemContainer.setAttribute("id", "task-item");
          itemContainer.style.display = "flex";
          const itemTitle = document.createElement("p");
          itemTitle.textContent = task.title;
          itemTitle.classList.add("item-title");
          const itemPriority = document.createElement("p");
          itemPriority.textContent = task.priority;
          itemPriority.classList.add("item-priority");
          const itemDueDate = document.createElement("p");
          itemDueDate.textContent = task.dueDate;
          itemDueDate.classList.add("item-due-date");
          const itemDeleteButton = document.createElement("button");
          itemDeleteButton.classList.add("fas");
          itemDeleteButton.classList.add("fa-times");
          itemDeleteButton.addEventListener("click", (e) => {
            element.tasks.map((task) => {
              if (task.title === e.target.parentElement.firstChild.textContent) {
                let index = element.tasks.indexOf(task);
                element.tasks.splice(index, 1);
                Data.updateLocalStorage();
                e.target.parentElement.remove();
              }
            });
          });

          itemContainer.appendChild(itemTitle);
          itemContainer.appendChild(itemPriority);
          itemContainer.appendChild(itemDueDate);
          itemContainer.appendChild(itemDeleteButton);
          tasks.appendChild(itemContainer);

          const modal = document.querySelector(".modal");
          modal.remove();
        }
      });
    });

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.textContent = "Delete Project";
    deleteProjectButton.addEventListener("click", () => {
      Lists.projectsList.map((element) => {
        if (element.title === projecTitle) {
          let index = Lists.projectsList.indexOf(element);
          Lists.projectsList.splice(index, 1);
          Data.updateLocalStorage();
          clearInterface();
          if (Lists.projectsList.length <= 0) {
            projectPromptInterface();
          } else if (Lists.projectsList.length > 0) {
            allProjectsInterface();
          }
        }
      });
    });

    const legend = document.createElement("div");
    legend.classList.add("legend");
    legend.style.display = "flex";
    legend.style.gap = "50px";
    legend.style.justifyContent = "center";

    const legendLow = document.createElement("div");
    legendLow.classList.add("legend-item");
    legendLow.style.display = "flex";
    legendLow.style.gap = "5px";
    const legendLowText = document.createElement("p");
    legendLowText.textContent = "Low";
    legendLowText.style.color = "#333333";
    const legendLowSymbol = document.createElement("p");
    legendLowSymbol.textContent = "!";
    legendLowSymbol.classList.add("legend-symbol");
    legendLowSymbol.style.color = "#e63946";
    legendLow.appendChild(legendLowText);
    legendLow.appendChild(legendLowSymbol);

    const legendMedium = document.createElement("div");
    legendMedium.classList.add("legend-item");
    legendMedium.style.display = "flex";
    legendMedium.style.gap = "5px";
    const legendMediumText = document.createElement("p");
    legendMediumText.textContent = "Medium";
    legendMediumText.style.color = "#333333";
    const legendMediumSymbol = document.createElement("p");
    legendMediumSymbol.textContent = "!!";
    legendMediumSymbol.classList.add("legend-symbol");
    legendMediumSymbol.style.color = "#e63946";
    legendMedium.appendChild(legendMediumText);
    legendMedium.appendChild(legendMediumSymbol);

    const legendHigh = document.createElement("div");
    legendHigh.classList.add("legend-item");
    legendHigh.style.display = "flex";
    legendHigh.style.gap = "5px";
    const legendHighText = document.createElement("p");
    legendHighText.textContent = "High";
    legendHighText.style.color = "#333333";
    const legendHighSymbol = document.createElement("p");
    legendHighSymbol.textContent = "!!!";
    legendHighSymbol.classList.add("legend-symbol");
    legendHighSymbol.style.color = "#e63946";
    legendHigh.appendChild(legendHighText);
    legendHigh.appendChild(legendHighSymbol);

    legend.appendChild(legendLow);
    legend.appendChild(legendMedium);
    legend.appendChild(legendHigh);

    const tasks = document.createElement("ul");
    tasks.classList.add("task-ul");

    const updateTasksDisplay = (() => {
      Lists.projectsList.forEach((element) => {
        if (element.title === projecTitle) {
          element.tasks.forEach((task) => {
            const itemContainer = document.createElement("li");
            itemContainer.classList.add("item");
            itemContainer.setAttribute("id", "task-item");
            itemContainer.style.display = "flex";
            const itemTitle = document.createElement("p");
            itemTitle.textContent = task.title;
            itemTitle.classList.add("item-title");
            const itemPriority = document.createElement("p");
            itemPriority.textContent = task.priority;
            itemPriority.classList.add("item-priority");
            const itemDueDate = document.createElement("p");
            itemDueDate.textContent = task.dueDate;
            itemDueDate.classList.add("item-due-date");
            const itemDeleteButton = document.createElement("button");
            itemDeleteButton.classList.add("fas");
            itemDeleteButton.classList.add("fa-times");
            itemDeleteButton.addEventListener("click", (e) => {
              element.tasks.map((task) => {
                if (task.title === e.target.parentElement.firstChild.textContent) {
                  let index = element.tasks.indexOf(task);
                  element.tasks.splice(index, 1);
                  Data.updateLocalStorage();
                  e.target.parentElement.remove();
                }
              });
            });

            itemContainer.appendChild(itemTitle);
            itemContainer.appendChild(itemPriority);
            itemContainer.appendChild(itemDueDate);
            itemContainer.appendChild(itemDeleteButton);
            tasks.appendChild(itemContainer);
          });
        }
      });
    })();

    buttonsContainer.appendChild(projectsButton);
    buttonsContainer.appendChild(newTaskButton);
    buttonsContainer.appendChild(deleteProjectButton);

    interfaceContainer.appendChild(interfaceHeading);
    interfaceContainer.appendChild(buttonsContainer);
    interfaceContainer.appendChild(legend);
    interfaceContainer.appendChild(tasks);
    main.appendChild(interfaceContainer);
  };

  const clearInterface = () => {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    const header = document.createElement("header");
    const pageTitle = document.createElement("h1");
    pageTitle.textContent = "Todo List";
    const icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-check-circle");
    header.appendChild(pageTitle);
    header.appendChild(icon);
    main.appendChild(header);
  };

  const handlePageLoad = (() => {
    window.addEventListener("load", (e) => {
      let projects = JSON.parse(localStorage.getItem("Projects"));
      let pageCookie = document.cookie;

      if (projects) {
        Lists.projectsList = projects;
      }

      if (Lists.projectsList.length <= 0) {
        projectPromptInterface();
      } else if (Lists.projectsList.length > 0) {
        allProjectsInterface();
      }
    });
  })();

  const formCancelClick = (() => {
    const modal = document.getElementsByClassName("modal");

    document.addEventListener("mouseup", (e) => {
      if (e.target === modal[0]) {
        modal[0].remove();
      }
    });
  })();
})();

const Data = (() => {
  const updateLocalStorage = () => {
    localStorage.setItem("Projects", JSON.stringify(Lists.projectsList));

    let projects = JSON.parse(localStorage.getItem("Projects"));

    Lists.projectsList = projects;
  };

  return { updateLocalStorage };
})();
