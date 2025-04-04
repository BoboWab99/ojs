class TaskMediator extends OpenScript.Mediator {
    $$task = {
        create: (ed) => this.create(ed),
        update: (ed) => this.update(ed),
        delete: (ed) => this.delete(ed),
        toggleCompleted: (ed) => this.toggleCompleted(ed),
        
        needs: {
            fetchAll: () => this.fetchAll(),
        }
    };

    fetchAll() {
        context("data").tasks.value = this.storedTasks();
    }

    create(ed) {
        const { message } = EventData.parse(ed);
        const _old = this.storedTasks();
        _old.push(
            new Task({
                task: message.task,
                dueDate: message.dueDate
            })
        );
        this.storeTasks(_old);
        context("data").tasks.value = _old;
    }

    update(ed) {
        const { message } = EventData.parse(ed);
        const _old = this.storedTasks();
        const _new = _old.map((item) => {
            if (item.id != message.id) return item;
            return item.update({
                task: message.task,
                dueDate: message.dueDate,
                isCompleted: message.isCompleted
            });
        });
        this.storeTasks(_new);
        context("data").tasks.value = _new;
    }

    toggleCompleted(ed) {
        const { message } = EventData.parse(ed);
        const _old = this.storedTasks();
        const _new = _old.map((item) => {
            if (item.id != message.id) return item;
            return item.update({ isCompleted: !item.isCompleted });
        });
        this.storeTasks(_new);
        context("data").tasks.value = _new;
    }

    delete(ed) {
        const { message } = EventData.parse(ed);
        const _old = this.storedTasks();
        const _new = _old.filter((item) => item.id != message.id);
        this.storeTasks(_new);
        context("data").tasks.value = _new;
        return broker.emit($e.task.is.deleted, ed);
    }

    storedTasks() {
        const stored = localStorage.getItem("task_tracker_task_list");
        const toList = stored == null ? [] : Task.fromJSONListString(stored);
        if (!stored) this.storeTasks(toList);
        // console.log("storedTasks():\n", Task.toJSONList(toList));
        return toList;
    }

    /**
     * @param {Array<Task>} tasks 
     */
    storeTasks(tasks) {
        // console.log("storeTasks(tasks):\n", Task.toJSONListString(tasks));
        return localStorage.setItem(
            "task_tracker_task_list", Task.toJSONListString(tasks)
        );
    }
}