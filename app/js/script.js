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
    const projectForm = document.createElement("form");
    const projectFormLabel = document.createElement("label");
    projectFormLabel.textContent = "New Project";
    const projectFormInput = document.createElement("input");
    projectFormInput.setAttribute("type", "text");
    projectFormInput.required = true;
    projectFormInput.classList.add("project-name-input");
    projectForm.appendChild(projectFormLabel);
    projectForm.appendChild(projectFormInput);

    main.appendChild(projectForm);

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let userInputProject = document.querySelector(".project-name-input");

      const project = Project(userInputProject.value);
      Lists.projectsList.push(project);

      Data.updateProjectsLocalStorage();

      clearInterface();
      allProjectsInterface();
    });
  };

  const allProjectsInterface = () => {
    const interfaceHeading = document.createElement("h1");
    interfaceHeading.textContent = "Projects";
    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "New Project";
    const projects = document.createElement("ul");

    Lists.projectsList.forEach((element) => {
      const item = document.createElement("li");
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

    main.appendChild(interfaceHeading);
    main.appendChild(newProjectButton);
    main.appendChild(projects);
  };

  const currentProjectInterface = (projecTitle) => {
    const interfaceHeading = document.createElement("h1");
    interfaceHeading.textContent = projecTitle;

    const projectsButton = document.createElement("button");
    projectsButton.textContent = "Projects";
    projectsButton.addEventListener("click", () => {
      clearInterface();
      allProjectsInterface();
    });

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "New Task";
    newTaskButton.addEventListener("click", () => {
      const taskForm = document.createElement("form");

      const taskTitle = document.createElement("input");
      taskTitle.setAttribute("type", "text");
      taskTitle.setAttribute("placeholder", "Title");
      taskTitle.required = true;

      const taskDueDate = document.createElement("input");
      taskDueDate.setAttribute("type", "date");
      taskDueDate.setAttribute("placeholder", "Due Date");
      taskDueDate.required = true;

      const taskPriority = document.createElement("select");
      taskPriority.setAttribute("name", "priority");
      taskPriority.required = true;
      taskPriorityPlaceholder = document.createElement("option");
      taskPriorityPlaceholder.textContent = "Priority";
      taskPriorityPlaceholder.style.display = "none";
      taskPriorityLow = document.createElement("option");
      taskPriorityLow.setAttribute("value", "Low");
      taskPriorityLow.textContent = "Low";
      taskPriorityMedium = document.createElement("option");
      taskPriorityMedium.setAttribute("value", "Medium");
      taskPriorityMedium.textContent = "Medium";
      taskPriorityHigh = document.createElement("option");
      taskPriorityHigh.setAttribute("value", "High");
      taskPriorityHigh.textContent = "High";
      taskPriority.appendChild(taskPriorityPlaceholder);
      taskPriority.appendChild(taskPriorityLow);
      taskPriority.appendChild(taskPriorityMedium);
      taskPriority.appendChild(taskPriorityHigh);

      const taskSubmitButton = document.createElement("button");
      taskSubmitButton.setAttribute("type", "submit");
      taskSubmitButton.textContent = "Submit";

      taskForm.appendChild(taskTitle);
      taskForm.appendChild(taskDueDate);
      taskForm.appendChild(taskPriority);
      taskForm.appendChild(taskSubmitButton);

      main.appendChild(taskForm);

      taskSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

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
        Data.updateProjectsLocalStorage();

        const itemContainer = document.createElement("li");
        itemContainer.style.display = "flex";
        itemContainer.style.gap = "15px";
        const itemTitle = document.createElement("p");
        itemTitle.textContent = task.title;
        const itemPriority = document.createElement("p");
        itemPriority.textContent = task.priority;
        const itemDueDate = document.createElement("p");
        itemDueDate.textContent = task.dueDate;
        const itemCheckbox = document.createElement("input");
        itemCheckbox.setAttribute("type", "checkbox");
        const itemDeleteButton = document.createElement("button");
        itemDeleteButton.textContent = "Delete";
        itemDeleteButton.addEventListener("click", (e) => {
          element.tasks.map((task) => {
            if (task.title === e.target.parentElement.firstChild.textContent) {
              let index = element.tasks.indexOf(task);
              element.tasks.splice(index, 1);
              Data.updateProjectsLocalStorage();
              e.target.parentElement.remove();
            }
          });
        });

        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemPriority);
        itemContainer.appendChild(itemDueDate);
        itemContainer.appendChild(itemCheckbox);
        itemContainer.appendChild(itemDeleteButton);
        tasks.appendChild(itemContainer);
      });
    });

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.textContent = "Delete Project";
    deleteProjectButton.addEventListener("click", () => {
      Lists.projectsList.map((element) => {
        if (element.title === projecTitle) {
          let index = Lists.projectsList.indexOf(element);
          Lists.projectsList.splice(index, 1);
          Data.updateProjectsLocalStorage();
          clearInterface();
          if (Lists.projectsList.length <= 0) {
            projectPromptInterface();
          } else if (Lists.projectsList.length > 0) {
            allProjectsInterface();
          }
        }
      });
    });

    const tasks = document.createElement("ul");

    const updateTasksDisplay = (() => {
      Lists.projectsList.forEach((element) => {
        if (element.title === projecTitle) {
          element.tasks.forEach((task) => {
            const itemContainer = document.createElement("li");
            itemContainer.style.display = "flex";
            itemContainer.style.gap = "15px";
            const itemTitle = document.createElement("p");
            itemTitle.textContent = task.title;
            const itemPriority = document.createElement("p");
            itemPriority.textContent = task.priority;
            const itemDueDate = document.createElement("p");
            itemDueDate.textContent = task.dueDate;
            const itemCheckbox = document.createElement("input");
            itemCheckbox.setAttribute("type", "checkbox");
            const itemDeleteButton = document.createElement("button");
            itemDeleteButton.textContent = "Delete";
            itemDeleteButton.addEventListener("click", (e) => {
              element.tasks.map((task) => {
                if (task.title === e.target.parentElement.firstChild.textContent) {
                  let index = element.tasks.indexOf(task);
                  element.tasks.splice(index, 1);
                  Data.updateProjectsLocalStorage();
                  e.target.parentElement.remove();
                }
              });
            });

            itemContainer.appendChild(itemTitle);
            itemContainer.appendChild(itemPriority);
            itemContainer.appendChild(itemDueDate);
            itemContainer.appendChild(itemCheckbox);
            itemContainer.appendChild(itemDeleteButton);
            tasks.appendChild(itemContainer);
          });
        }
      });
    })();

    main.appendChild(interfaceHeading);
    main.appendChild(projectsButton);
    main.appendChild(newTaskButton);
    main.appendChild(deleteProjectButton);
    main.appendChild(tasks);
  };

  const clearInterface = () => {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
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
})();

const Data = (() => {
  const updateProjectsLocalStorage = () => {
    localStorage.setItem("Projects", JSON.stringify(Lists.projectsList));

    let projects = JSON.parse(localStorage.getItem("Projects"));

    Lists.projectsList = projects;
  };

  return { updateProjectsLocalStorage };
})();
