export default function taskCard(obj, num){
    // num paramater will be used to switch between simple or full elements
    const taskContainer =  document.createElement("li");
    taskContainer.classList = "task";
    const firstList = document.createElement("li");
    firstList.className = "task-list"
    const checkbox =  document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "completed");
    checkbox.className = "checkbox";
    if (obj.completed){
        taskContainer.className = "task completed";
        checkbox.checked = true;
    }
    else {
        taskContainer.className = "task";
        checkbox.checked =  false;
    }
   
    const title = document.createElement("h2");
    firstList.append()
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
    const secondList = document.createElement("li");
    secondList.className = "task-list";
    if(num = 1){
        firstList.append(checkbox, title)
        secondList.append(dueDate, priority)
        taskContainer.append(firstList,secondList)
    }
    else if(num = 2){
        taskContainer.append(title, dueDate, description, priority,project);
    }
   
    return taskContainer;
}