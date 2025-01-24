export default function taskCard(obj, num){
    // num paramater will be used to switch between simple or full elements
    const taskContainer =  document.createElement("div");
    taskContainer.classList = "task";
    const title = document.createElement("h2");

    console.log(`${obj.name} was added to our title`)
    title.textContent = obj.name;
    
    const dueDate = document.createElement("p");
    dueDate.textContent = obj.dueDate;
    const description = document.createElement("p");
    description.textContent = obj.description;
    const priority = document.createElement("p");
    priority.textContent = obj.priority;
    const project = document.createElement("p");
    project.textContent = obj.project;
    if(num = 1){
        taskContainer.append(title,dueDate,priority)
    }
    else if(num = 2){
        taskContainer.append(title, dueDate, description, priority,project);
    }
   
    return taskContainer;
}