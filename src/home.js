import { ScreenController } from "./modules/screenController";

export const  homePage = () => {
   
    const content = document.querySelector(".content");
    content.textContent = "";
    // const h1 = document.createElement("h1");
    // h1.id  = "Todo app";
    // h1.textContent = "Falcon's Todo"
    
  
    // content.append(h1);
    let UI = ScreenController;
    UI.app();

    
    
}