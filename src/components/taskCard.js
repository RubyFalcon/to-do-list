


export default function taskCard({obj}){

    // num paramater will be used to switch between simple or full elements
    const taskContainer =  document.createElement("li");
    taskContainer.classList = "task";
    taskContainer.id = `${chooseRightColor(obj.priority)}`
    const firstList = document.createElement("li");
    firstList.className = "task-list"
    const checkbox =  document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "completed");
    checkbox.className = "checkbox";
    if (obj.done){
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
    // const priority = document.createElement("p");
    // priority.textContent = obj.priority;

    const secondList = document.createElement("li");
    secondList.className = "task-list";
   
    firstList.append(checkbox, title)
    secondList.append(dueDate)
    taskContainer.append(firstList,secondList)
   
    let chooseRightColor = function (taskPriority) {
        switch (taskPriority) {
            case "High":
                return "red-border";
            case "Medium":
                return "yellow-border";
            case "Low":
                return "green-border";
            default:
                return "gray-border";
        }
    };

   
    return taskContainer;
}