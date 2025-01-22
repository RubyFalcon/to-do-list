import {format} from "date-fns";

export default class Task {
    constructor({name, description, priority, dueDate}){
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }
    
    setDescription(description){
        this.description = description;
    }

    getDescription(){
        return this.description;
    }

    setPriority(priority){
        this.priority = priority;
    }

    getPrioritiy(){
        return this.priority
    }

    setDate(dueDate){
        this.dueDate = dueDate || format(new Date(), "yyyy-MM-dd");
    }
    getDate(){
        return this.dueDate
    }
}