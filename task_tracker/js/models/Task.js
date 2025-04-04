class Task {
    /**
     * task (String)
     * dueDate (String?)
     * isCompleted (Boolean)
     * id (String)
     */
    constructor({ task, dueDate = null, isCompleted = false, id = null } = {}) {
        this.id = id ?? __uid__();
        this.task = task;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }

    /**
     * task (String?)
     * dueDate (String?)
     * isCompleted (Boolean?)
     */
    update({ task = null, dueDate = null, isCompleted = null } = {}) {
        this.task = task ?? this.task;
        this.dueDate = dueDate ?? this.dueDate;
        this.isCompleted = isCompleted ?? this.isCompleted;
        return this;
    }
    
    /**
     * task (String?)
     * dueDate (String?)
     * isCompleted (Boolean?)
     */
    copyWith({ task = null, dueDate = null, isCompleted = null } = {}) {
        return new Task({
            task: task ?? this.task,
            dueDate: dueDate ?? this.dueDate,
            isCompleted: isCompleted ?? this.isCompleted
        });
    }

    toJSON() {
        return {
            id: this.id,
            task: this.task,
            dueDate: this.dueDate,
            isCompleted: this.isCompleted
        };
    }

    toJSONString() {
        return JSON.stringify(this.toJSON());
    }

    static fromJSON(obj) {
        return new Task({
            id: obj["id"],
            task: obj["task"],
            dueDate: obj["dueDate"],
            isCompleted: obj["isCompleted"]
        });
    }

    /**
     * @param {String} str 
     * @returns 
     */
    static fromJSONString(str) {
        return Task.fromJSON(JSON.parse(str));
    }

    /**
     * @param {Array<any>} data 
     * @returns 
     */
    static fromJSONList(data) {
        return data.map((item) => this.fromJSON(item));
    }

    /**
     * @param {String} str 
     */
    static fromJSONListString(str) {
        return this.fromJSONList(JSON.parse(str));
    }

    /**
     * @param {Array<Task>} tasks 
     */
    static toJSONList(tasks) {
        return tasks.map((item) => item.toJSON());
    }
    
    /**
     * @param {Array<Task>} tasks 
     */
    static toJSONListString(tasks) {
        return JSON.stringify(this.toJSONList(tasks));
    }

    equals(other) {
        if (!(other instanceof Task)) {
            return false;
        }
        return (
            this.id === other.id &&
            this.task === other.task &&
            this.dueDate === other.dueDate &&
            this.isCompleted === other.isCompleted
        );
    }
}