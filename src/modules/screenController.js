import { TodoController } from "./todoController";
import Project from "./projectClass";
import { format } from 'date-fns';


export const ScreenController = function () {
    //DOM obects

    let sidebar = document.querySelector(".sidebar");
    let header = document.querySelector(".header");
    let content = document.querySelector(".content");

    let createProjectButton = document.querySelector("#create-project-btn");
    let createTaskButton = document.querySelector("#create-task-btn");

    //DOM elements
    const modal = document.getElementById('modal');
    const editModal = document.getElementById('edit-modal');
    const editCloseModal = document.getElementById('close-edit-modal')
    const closeModalBtn = document.getElementById('close-modal');
    const taskForm = document.getElementById('task-form');

    let todoList = TodoController;
    let currentProject= null;


    const openModal = function () {
        modal.classList.remove("hidden");
    }
    const closeModal = function () {
        modal.classList.add("hidden");
    }

    const submitForm  = function () {
        taskForm.addEventListener("submit", (e)=> {
            e.preventDefault;


            //Get form values

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const dueDate = document.getElementById('dueDate').value;
            const priority = document.getElementById('priority').value;

            //create new Task 
            // add Task to list
            currentProject.createTask(title,description,dueDate, priority);
            updateProjectInLocalStorage(currentProject);
             // Clear the form and close the modal
            taskForm.reset();
            modal.classList.add('hidden');
            displayTasks();
        })
    }

    const openEditModal = function (task) {
        const editModal = document.getElementById('edit-modal');
        document.getElementById('edit-title').value = task.title;
        document.getElementById('edit-description').value = task.description;
        document.getElementById('edit-dueDate').value = task.dueDate;
        document.getElementById('edit-priority').value = task.priority;
        editModal.classList.remove('hidden');
    };

    const closeEditModal = function () {
        const editModal = document.getElementById('edit-modal');
        editModal.classList.add('hidden');
    };

    const sumbitEditModal = function (currentTask) {
        // Attach the submit event handler (ensure only one listener is active)
        const editForm = document.getElementById('edit-task-form');
        editForm.onsubmit = (e) => {
            e.preventDefault();

            // Update task with new values
            currentTask.title = document.getElementById('edit-title').value;
            currentTask.description = document.getElementById('edit-description').value;
            currentTask.dueDate = document.getElementById('edit-dueDate').value;
            currentTask.priority = document.getElementById('edit-priority').value;

            // Close modal, clear form, and refresh the task list
            updateProjectInLocalStorage(currentProject);
            closeEditModal();
            editForm.reset();
            displayTasks();
        };
    }

    let clearSidebar = function () {
        Array.from(sidebar.children).forEach((child) => {
            if (!child.id || child.id !== "create-project-btn") {
                sidebar.removeChild(child);
            }
        });
    }

    let clearContent = function () {
        Array.from(content.children).forEach((child) => {
            if (!child.id || child.id !== "create-task-btn") {
                content.removeChild(child);
            }
        });
    }

    function getDaySuffix(date) {
        const day = date.getDate();
        if (day >= 11 && day <= 13) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    function formatTaskDate(dateStr) {
        const [year, month, day] = dateStr.split('-');
        const date = new Date(year, month - 1, day);

        const formattedDate = format(date, 'MMM dd');
        const daySuffix = getDaySuffix(date);
        return formattedDate.replace(/\d+/, match => `${match}${daySuffix}, ${year}`);
    }

    let displayTasks =  function () {
        clearContent();


        for (let task of currentProject.getTasks()) {
            const formattedTaskDate = formatTaskDate(task.dueDate);

            let taskContainer = document.createElement('div');
            const taskList =  document.createElement("li");
            taskList.classList = "task";
            taskList.id = `${chooseRightColor(task.priority)}`
            const firstList = document.createElement("li");
            firstList.className = "task-list"
            const checkbox =  document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "done");
            checkbox.className.add("checkbox");
            // if (task.done){
            //     taskList.className = "task completed";
            //     checkbox.checked = true;
            // }
            // else {
            //     taskList.className = "task";
            //     checkbox.checked =  false;
            // }
           
            const title = document.createElement("h2");
            title.classList.add("class-title");
            title.textContent = task.name;
            
            const dueDate = document.createElement("p");
            dueDate.textContent = formattedTaskDate;
            const description = document.createElement("p");
            description.textContent = task.description;
            // const priority = document.createElement("p");
            // priority.textContent = task.priority;
            
            const secondList = document.createElement("li");
            secondList.className = "task-list";
            
            //buttons
            const taskButtonContainer = document.createElement("div");
            taskButtonContainer.className = "task-button-container";

            //Details button
            const detailsTaskButton = document.createElement("button");
            detailsTaskButton.className = "details-button";
            detailsTaskButton.textContent = "DETAILS";

            //Edit button
            const editTaskButton = document.createElement("button");
            editTaskButton.className = "edit-button";
            editTaskButton.textContent = "EDIT";

            //Delete button
            const deleteTaskButton = document.createElement("button");
            deleteTaskButton.className = "delete-button";
            deleteTaskButton.textContent = "DELETE";

            taskButtonContainer.append(detailsTaskButton, editTaskButton, deleteTaskButton);
            firstList.append(checkbox, title)
            secondList.append(dueDate, taskButtonContainer)
            taskList.append(firstList,secondList)
            content.append(taskList);

            editTaskButton.addEventListener('click', () => {
                console.log('Clicked on Edit Button');
                const currentTask = currentProject.findTask(task.title);
                openEditModal(currentTask);
                sumbitEditModal(currentTask);
                editCloseModal.addEventListener('click', closeEditModal);
            });
            checkbox.checked = task.done;
            updateTaskVisualState(task, title, dueDate, editTaskButton, detailsTaskButton);
            checkbox.addEventListener('change', () => {
                handleCheckboxChange(task, checkbox, title, dueDate, editTaskButton, detailsTaskButton);
            });

            
        }
        
    }
    let updateTaskVisualState = function (task, taskTitle, editButton, detailsButton) {
        if (task.done) {
            taskTitle.style.textDecoration = 'line-through';
            taskList.classList.add("completed");;
            editButton.disabled = true;
            detailsButton.disabled = true;
            
        } else {
            taskTitle.style.textDecoration = 'none';
            task.classList.remove("completed");
            editButton.disabled = false;
            detailsButton.disabled = false;

        }
    }

    let handleCheckboxChange = function (task, checkbox, taskTitle, editButton, detailsButton) {
        task.done = checkbox.checked;
        updateTaskVisualState(task, taskTitle,  editButton, detailsButton);
        updateProjectInLocalStorage(currentProject);
    }

    let selectProject = function () {
        // Make sure the projects are rendered before attaching event listeners
        const projectElements = document.querySelectorAll('.project');

        projectElements.forEach(projectElement => {
            projectElement.addEventListener('click', (event) => {
                // Avoid the checkbox elements
                if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
                    return;
                }

                console.log(event.target);
                event.target.classList.add("bg-blue-100");
                event.target.classList.add("text-blue-600")

                currentProject = todoList.findProject(event.target.innerHTML);
                console.log(`Current Project Name: ${currentProject.getName()}`);
                clearBackgroundProjects();
                displayTasks();
            });
        });
    }
    let editClicked = function () {
        const editButtons = document.querySelectorAll('.edit-button');

        editButtons.forEach(editButton => {
            editButton.addEventListener('click', (event) => {
                const taskElement = getDOMTask(event);
                const currentTask = currentProject.findTask(taskElement);

                openEditModal(currentTask);
                sumbitEditModal(currentTask);
                editCloseModal.addEventListener('click', closeEditModal);
            });
        });
    }

    let detailsClicked = function () {
        document.body.addEventListener('click', (event) => {
            if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
                return;
            }

            if (event.target.classList.contains('details-button')) {
                console.log('Clicked on Details Button');
                let currentTask = currentProject.findTask(getDOMTask(event));
                openDescriptionModal(currentTask);
                closeDescriptionModal();
            }
        });
    }

    let deleteClicked = function () {
        document.body.addEventListener('click', (event) => {
            if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
                return;
            }

            if (event.target.classList.contains('delete-button')) {
                console.log('Clicked on Delete Button');
                currentProject.deleteTask(getDOMTask(event));
                updateProjectInLocalStorage(currentProject);
                displayTasks();
            }
        });
    }

    let chooseRightColor = function (taskPriority) {
        switch (taskPriority) {
            case "High":
                return "red-border";
            case "Medium":
                return "yellow-border";
            case "Low":
                return "green-border";
            default:
                return "gray-border";
        }
    };

    let getDOMTask = function (event) {
        const taskElement = event.target.closest(".task-list");
        let value = taskElement.querySelector('.task-title');
        return value.textContent.trim();
    }

    let clearBackgroundProjects = function () {
        Array.from(sidebar.children).forEach((child) => {
            if ((!child.id || child.id !== "create-project-btn") && child.innerHTML !== currentProject.getName()) {
                child.classList.remove("bg-blue-100");
                child.classList.remove("text-blue-600")
            }
        });
    }

    let openDescriptionModal = function (currentTask) {
        const descriptionModal = document.querySelector("#description-modal")
        const param = document.querySelector("#set-description")
        descriptionModal.classList.remove("hidden");
        param.innerHTML = currentTask.description;
    }

    let closeDescriptionModal = function () {
        const closeViewModal = document.querySelector("#close-view-modal");
        closeViewModal.addEventListener("click", function () {
            const descriptionModal = document.querySelector("#description-modal")
            descriptionModal.classList.add("hidden");
        })
    }

    let openProjectModal = function () {
        const projectModal = document.querySelector("#create-project-modal")
        projectModal.classList.remove("hidden");
    }
    
    let closeProjectModal = function () {
        const closeProjectModal = document.querySelector("#close-create-project-modal");
        closeProjectModal.addEventListener("click", function () {
            const projectModal = document.querySelector("#create-project-modal")
            projectModal.classList.add("hidden");
        })
    }

    const saveProjectModal = function () {
        const projectForm = document.getElementById('create-project-form');
        const projectModal = document.querySelector("#create-project-modal")

        projectForm.onsubmit = (e) => {
            e.preventDefault();

            const projectName = document.querySelector("#project-name").value;
            const existingProject = todoList.getProjects().find(project => project.getName() === projectName);

            if (existingProject) {
                alert('¡This project already exists!');
                return;
            }

            // Update task with new values
            let newProject = new Project(document.querySelector("#project-name").value);
            todoList.addProject(newProject);
            saveToLocalStorage(newProject);

            // Close modal, clear form, and refresh the task list
            projectModal.classList.add("hidden");
            projectForm.reset();
            displayTasks();
            displayProjects();
        };
    }
    let displayProjects = function () {
        clearSidebar(); // Clear existing sidebar items

        // Retrieve the number of projects from localStorage
        let projectCount = parseInt(localStorage.getItem('projectCount')) || 0;

        for (let i = 0; i < projectCount; i++) {
            let savedProjectData = localStorage.getItem(`project_${i}`);

            if (savedProjectData) {
                // Rebuild the Project object
                let savedProject = Project.fromJSON(JSON.parse(savedProjectData));

                // Create a new div for the project
                let div = document.createElement('div');
                div.innerHTML = savedProject.getName();
                div.classList.add("project");

                // Highlight the current project
                if (savedProject.getName() === currentProject.getName()) {
                    div.classList.add("bg-blue-100");
                    div.classList.add("text-blue-600")
                }

                // Append to sidebar
                sidebar.appendChild(div);
            }
        }

    selectProject();
    }

    let saveToLocalStorage = function (project) {
        // Retrieve the current project count
        let projectCount = parseInt(localStorage.getItem('projectCount')) || 0;

        // Save the project using the next available key
        localStorage.setItem(`project_${projectCount}`, JSON.stringify(project.toJSON()));

        // Increment and update the project count
        localStorage.setItem('projectCount', projectCount + 1);
    };
    
    let updateProjectInLocalStorage = function (project) {
        let projectCount = parseInt(localStorage.getItem('projectCount')) || 0;

        for (let i = 0; i < projectCount; i++) {
            let savedProjectData = localStorage.getItem(`project_${i}`);

            if (savedProjectData) {
                let savedProject = Project.fromJSON(JSON.parse(savedProjectData));

                // Match projects by name and update tasks
                if (savedProject.getName() === project.getName()) {
                    localStorage.setItem(`project_${i}`, JSON.stringify(project.toJSON()));
                    break;
                }
            }
        }
    };

    let initialLoad = function () {
        document.addEventListener("DOMContentLoaded", () => {
            todoList.clearProjects(); // Clear in-memory projects

            // Retrieve all projects from localStorage
            let projectCount = parseInt(localStorage.getItem('projectCount')) || 0;

            for (let i = 0; i < projectCount; i++) {
                let projectData = localStorage.getItem(`project_${i}`);
                if (projectData) {
                    let project = Project.fromJSON(JSON.parse(projectData));
                    todoList.addProject(project);
                }
            }

            // If no projects are found, create a default one
            if (todoList.getProjects().length === 0) {
                currentProject = new Project("To-Do");
                todoList.addProject(currentProject);

                // Add tasks to the default project
                currentProject.createTask("Morning Exercise", "Go for a 30-minute jog or do a yoga session.", "2025-01-21", "High");
                currentProject.createTask("Breakfast Preparation", "Prepare and eat a healthy breakfast.", "2025-01-21", "Medium");
                currentProject.createTask("Work Emails", "Check and respond to work-related emails.", "2025-01-21", "Medium");
                currentProject.createTask("Lunch Break", "Take a break and have lunch.", "2025-01-21", "Low");
                currentProject.createTask("Grocery Shopping", "Buy essential groceries for the week.", "2025-01-21", "High");
                currentProject.createTask("Evening Walk", "Take a relaxing walk to clear your mind.", "2025-01-21", "Low");
                // Save the default project
                localStorage.setItem('project_0', JSON.stringify(currentProject.toJSON()));
                localStorage.setItem('projectCount', 1);
            } else {
                currentProject = todoList.getProjects()[0];
            }

            // Display all projects and tasks
            displayProjects();
            displayTasks();
        });
    }
    let createDOMProject = function () {
        createProjectButton.addEventListener("click", function () {
            openProjectModal();
            closeProjectModal();
            saveProjectModal();
        });
    }

    let createDOMTask = function () {
        createTaskButton.addEventListener("click", openModal);
        closeModalBtn.addEventListener("click", closeModal);
        sumbitModal();
    }

    return {
        app() {
            initialLoad();
            createDOMProject();
            selectProject();
            createDOMTask();
            editClicked();
            detailsClicked();
            deleteClicked();
        }

    }


}();