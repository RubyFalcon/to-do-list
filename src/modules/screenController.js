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
        

        }
        
    }


}