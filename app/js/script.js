const Project = (title) => {
  title: title;
  let tasks = [];

  return { title, tasks };
};

const Task = (title, description, dueDate) => {
  return { title, description, dueDate };
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

      const taskDescription = document.createElement("input");
      taskDescription.setAttribute("type", "text");
      taskDescription.setAttribute("placeholder", "Description");
      taskDescription.required = true;

      const taskDueDate = document.createElement("input");
      taskDueDate.setAttribute("type", "date");
      taskDueDate.setAttribute("placeholder", "Due Date");
      taskDueDate.required = true;

      const taskSubmitButton = document.createElement("button");
      taskSubmitButton.setAttribute("type", "submit");
      taskSubmitButton.textContent = "Submit";

      taskForm.appendChild(taskTitle);
      taskForm.appendChild(taskDescription);
      taskForm.appendChild(taskDueDate);
      taskForm.appendChild(taskSubmitButton);

      main.appendChild(taskForm);

      taskSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        const task = Task(taskTitle.value, taskDescription.value, taskDueDate.value);

        Lists.projectsList.forEach((element) => {
          if (element.title === projecTitle) {
            element.tasks.push(task);

            taskTitle.value = "";
            taskDescription.value = "";
            taskDueDate.value = "";

            taskForm.remove();

            while (tasks.firstChild) {
              tasks.removeChild(tasks.firstChild);
            }

            element.tasks.forEach((task) => {
              const item = document.createElement("li");
              item.textContent = task.title;

              tasks.appendChild(item);
            });
          }
        });
      });
    });

    const tasks = document.createElement("ul");

    Lists.projectsList.forEach((element) => {
      if (element.title === projecTitle) {
        element.tasks.forEach((task) => {
          const item = document.createElement("li");
          item.textContent = task.title;

          tasks.appendChild(item);
        });
      }
    });

    main.appendChild(interfaceHeading);
    main.appendChild(projectsButton);
    main.appendChild(newTaskButton);
    main.appendChild(tasks);
  };

  const clearInterface = () => {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  };

  const handlePageLoad = (() => {
    window.addEventListener("load", () => {
      if (Lists.projectsList.length <= 0) {
        projectPromptInterface();
      } else if (Lists.projectsList.length > 0) {
        allProjectsInterface();
      }
    });
  })();
})();
