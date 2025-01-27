

export default class Task {
    constructor(title, description, dueDate, priority, done = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
    }

    // Getter for done
    get done() {
        return this.done;
    }

    // Setter for done
    set done(value) {
        this.done = value;
    }

    // Getter for title
    get title() {
        return this.title;
    }

    // Setter for title
    set title(newTitle) {
        if (typeof newTitle === 'string' && newTitle.trim().length > 0) {
            this.title = newTitle;
        } else {
            throw new Error("Invalid title");
        }
    }

    // Getter for description
    get description() {
        return this.description;
    }

    // Setter for description
    set description(newDescription) {
        if (typeof newDescription === 'string') {
            this.description = newDescription;
        } else {
            throw new Error("Invalid description");
        }
    }

    // Getter for dueDate
    get dueDate() {
        return this.dueDate;
    }

    // Setter for dueDate
    set dueDate(newDueDate) {

        this.dueDate = newDueDate;

    }

    // Getter for priority
    get priority() {
        return this.priority;
    }

    // Setter for priority
    set priority(newPriority) {
        if (['low', 'medium', 'high'].includes(newPriority.toLowerCase())) {
            this.priority = newPriority;
        } else {
            throw new Error("Priority must be 'low', 'medium', or 'high'");
        }
    }
}