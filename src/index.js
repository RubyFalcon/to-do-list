import "./styles.css";
import {homePage} from "./home.js";


const homeButton = document.querySelector("#home")
const aboutButton = document.querySelector("#about");
const contactButton = document.querySelector("#contact");

homeButton.addEventListener("click", () => homePage());

aboutButton.addEventListener("click", ()=> about());
contactButton.addEventListener("click", ()=> contact() )
homePage();

