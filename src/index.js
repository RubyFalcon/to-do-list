import "./styles.css";
import {homePage} from "./home.js";
import { menu} from "./menu.js";
import {about } from "./about.js";
import {contact } from "./contact.js";
const homeButton = document.querySelector("#home")
const menuButton = document.querySelector("#menu");
const aboutButton = document.querySelector("#about");
const contactButton = document.querySelector("#contact");

homeButton.addEventListener("click", () => homePage());
menuButton.addEventListener("click", ()=> menu());
aboutButton.addEventListener("click", ()=> about());
contactButton.addEventListener("click", ()=> contact() )
homePage();


console.log("Hello world");