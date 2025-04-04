class TaskMediator extends OpenScript.Mediator {
    $$task = {
        create: (ed, _) => this.create(ed),
        update: (ed, _) => this.update(ed),
        delete: (ed, _) => this.delete(ed),
        toggleCompleted: (ed, _) => this.toggleCompleted(ed),
        
        needs: {
            fetchAll: (_, _) => this.fetchAll(),
        }
    };

    fetchAll() {
        context("data").tasks.value = TaskMediator.storedTasks();
        console.log("TaskMediator.fetchAll() ...");
    }

    create(ed) {
        const { message } = EventData.parse(ed);
        const _old = TaskMediator.storedTasks();
        _old.push(
            new Task({
                task: message.task,
                dueDate: message.dueDate
            })
        );
        TaskMediator.storeTasks(_old);
        context("data").tasks.value = _old;
        console.log("TaskMediator.create(ed) ...");
    }

    update(ed) {
        const { message } = EventData.parse(ed);
        const _old = TaskMediator.storedTasks();
        const _new = _old.map((item) => {
            if (item.id != message.id) return item;
            return item.update({
                task: message.task,
                dueDate: message.dueDate,
                isCompleted: message.isCompleted
            });
        });
        TaskMediator.storeTasks(_new);
        context("data").tasks.value = _new;
        console.log("TaskMediator.update(ed) ...");
    }

    toggleCompleted(ed) {
        const { message } = EventData.parse(ed);
        const _old = TaskMediator.storedTasks();
        const _new = _old.map((item) => {
            if (item.id != message.id) return item;
            return item.update({ isCompleted: !item.isCompleted });
        });
        TaskMediator.storeTasks(_new);
        context("data").tasks.value = _new;
        console.log("TaskMediator.toggleCompleted(ed) ...");
    }

    delete(ed) {
        const { message } = EventData.parse(ed);
        const _old = TaskMediator.storedTasks();
        const _new = _old.filter((item) => item.id != message.id);
        TaskMediator.storeTasks(_new);
        context("data").tasks.value = _new;
        console.log("TaskMediator.delete(ed) ...");
        return broker.emit($e.task.is.deleted, ed);
    }

    /* 
    storedTasks() and storeTasks(tasks) mimick backend functionality.
    ----------------------------------------------------------------
    */

    static storedTasks() {
        const stored = localStorage.getItem("task_tracker_task_list");
        const toList = stored == null ? [] : Task.fromJSONListString(stored);
        if (!stored) storeTasks(toList);
        console.log("storedTasks():\n", Task.toJSONList(toList));
        return toList;
    }

    /**
     * @param {Array<Task>} tasks 
     */
    static storeTasks(tasks) {
        console.log("storeTasks(tasks):\n", Task.toJSONListString(tasks));
        return localStorage.setItem(
            "task_tracker_task_list", Task.toJSONListString(tasks)
        );
    }
}