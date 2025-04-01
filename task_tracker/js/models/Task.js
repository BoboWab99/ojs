class Task {
    /**
     * @param {String} task 
     * @param {String?} dueDate 
     * @param {Boolean} isCompleted 
     * @param {Number?} id 
     */
    constructor(task, dueDate = null, isCompleted = false, id = null) {
        this.id = id ?? Date.now();
        this.task = task;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }

    static fromJson(json) {
        return new Task(
            json["task"],
            json["dueDate"],
            json["isCompleted"],
            json["id"]
        );
    }

    /**
     * @param {String} jsonString 
     * @returns 
     */
    static fromJsonString(jsonString) {
        return Task.fromJson(JSON.parse(jsonString));
    }
}

Task.prototype.toJson = function () {
    return {
        "id": this.id,
        "task": this.task,
        "dueDate": this.dueDate,
        "isCompleted": this.isCompleted
    };
}

Task.prototype.toString = function () {
    return JSON.stringify(this.toJson());
}