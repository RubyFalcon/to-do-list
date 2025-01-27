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
        })
    }
}