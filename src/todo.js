export default todo() = {
    //

    
}

// we want to be able to create a project which has name todo lists, and todolists which have title,description, dueDate, notes, checklist
class Project {
    constructor(name){
        this.name = name;

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
function project({name}){
    return{
        name,
        todo: [],
    }
}

function todo({name}){
    return {

    }
}