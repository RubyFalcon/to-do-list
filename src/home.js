import Project  from "./modules/project.js";
import Task from "./modules/task.js"
import taskCard from "./components/taskCard.js";

export const  homePage = () => {
    
    const content = document.querySelector(".content");
    content.textContent = "";
    const h1 = document.createElement("h1");
    h1.id  = "Todo app";
    h1.textContent = "Falcon's Todo"
    
    const p  = document.createElement("p");
    p.id= "restaurant-description";
    p.textContent = "Welcome to Falcon's Fabolous Taverna, opened in the 80s in Holborn, a staple of Greek quisine in London";
    content.append(h1, p);


    let today = new Project("Today");
    today.addTask(new Task({ name: "Eat Food", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    today.addTask(new Task({ name: "Eat Pork", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    today.addTask(new Task({ name: "Eat Wine", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    today.addTask(new Task({ name: "Eat Mangarines", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    console.log(today);
    const taskContainer = document.createElement("div");
    taskContainer.className = "tasks";
    today.tasks.forEach(task => taskContainer.append(taskCard(task, 1)))
    document.body.appendChild(taskContainer)

}