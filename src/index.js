import "./styles.css";
import {homePage} from "./home.js";
import { menu} from "./menu.js";
import Project  from "./modules/project.js";


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
today.addTask("Cooking")
console.log(today);
