export default function taskCard(obj){
    const taskContainer =  document.createElement("div");
    taskContainer.classList = "task-page";
    const title = document.createElement("h2");
    title.textContent = obj.name;
    
    const dueDate = document.createElement("p");
    dueDate.textContent = obj.dueDate;


}