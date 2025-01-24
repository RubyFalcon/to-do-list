import "./styles.css";
import {homePage} from "./home.js";
import { menu} from "./menu.js";
import Project  from "./modules/project.js";
import Task from "./modules/task.js"

const homeButton = document.querySelector("#home")
const menuButton = document.querySelector("#menu");
const aboutButton = document.querySelector("#about");
const contactButton = document.querySelector("#contact");

homeButton.addEventListener("click", () => homePage());
menuButton.addEventListener("click", ()=> menu());
aboutButton.addEventListener("click", ()=> about());
contactButton.addEventListener("click", ()=> contact() )
homePage();

let today = new Project("Today");
today.addTask(new Task({ name: "Eat Food", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
console.log(today);
