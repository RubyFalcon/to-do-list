

// we want to be able to create a project which has name todo lists, and todolists which have title,description, dueDate, notes, checklist
class Project {
    constructor(name){
        this.name = name;
        this.todo = [];
    }

    addTodo(name){
        this.todo.append(new Todo(name));
    }
}


class Todo {
    constructor(title){
        this.title = title;
    }
    
    setDescription(description){
        this.description = description;
    }

    setDate(date){
        this.date = date;
    }

    setNotes(note){
        this.note = note;
    }

    setChecklist(){
        
    }
}

const projects = [];

function makeProject(project)  {
   
    console.log("Project was created");
    console.log(`Our project is called  ${project}`);
    projects.append(new Project(project))
}

function makeTodo(project, name){
    if(typeof(project) == Project && projects.includes(project.name)){
        project.addTodo(name);
    }
    else {
        console.log("invalid project type")
    }
    
}

function getProjects(){
    return projects;
}

export { makeProject, makeTodo, getProjects};