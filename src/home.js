import Project  from "./modules/project.js";
import Task from "./modules/task.js"
import taskCard from "./components/taskCard.js";

export const  homePage = () => {
    
    const content = document.querySelector(".content");
    content.textContent = "";
    const h1 = document.createElement("h1");
    h1.id  = "Todo app";
    h1.textContent = "Falcon's Todo"
    
  
    content.append(h1);


    let today = new Project("Today");
    today.addTask(new Task({ name: "Eat Food", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    today.addTask(new Task({ name: "Eat Pork", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    today.addTask(new Task({ name: "Eat Wine", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    today.addTask(new Task({ name: "Eat Mangarines", description: "time to eat some food", dueDate: "24/12/2025", priority:"med", project: "Today"}))
    console.log(today);
    const taskContainer = document.createElement("ul");
    taskContainer.className = "tasks";
    today.tasks.forEach(task => taskContainer.append(taskCard(task, 1)))
    content.appendChild(taskContainer)

}