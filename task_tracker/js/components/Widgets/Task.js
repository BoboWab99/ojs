class TaskListWidget extends OpenScript.Component {
    render(...args) {
        return h.div(
            v(dataContext.tasks, (tasks) => {
                if (tasks.value.length == 0) return h.div(
                    { class: "task-list" }, "No tasks yet!"
                );
                return h.ul(
                    { class: "task-list" },
                    each(tasks.value, (task) => h.TaskWidget(task)),
                    ...args
                );
            })
        );
    }
}

class TaskWidget extends OpenScript.Component {
    render(task, ...args) {
        return h.li(
            { class: "task-list-item" },
            h.span(
                { class: "check-wrapper" },
                h.CheckWidget(
                    false,
                    task.isCompleted,
                    { onchange: this.method("toggleCompleted", task) },
                    undefined,
                    { title: "Mark as complete" },
                )
            ),
            h.div(
                { class: "content" },
                h.span(
                    { data_task_attr: "task" },
                    task.task
                ),
                h.div(
                    { class: "due-date" },
                    h.i({ class: "fa-regular fa-calendar" }),
                    h.span(
                        { data_task_attr: "dueDate" },
                        (task.dueDate == null || task.dueDate.isEmpty()) ? "Anytime" : task.dueDate
                    ),
                ),
            ),
            h.div(
                { class: "options" },
                h.button(
                    {
                        onclick: this.method("update", task),
                        type: "button",
                        title: "Edit task",
                        class: "button button-primary-transparent button-edit",
                        data_cta: "update",
                        data_model: "Task",
                        data_toggle: "popup",
                        data_target: "#editTaskPopup"
                    },
                    h.i({ class: "fa-regular fa-pen-to-square" }),
                    h.span({ class: "visually-hidden" }, "Edit task")
                ),
                h.button(
                    {
                        onclick: this.method("delete", task),
                        type: "button",
                        title: "Delete task",
                        class: "button button-danger-transparent button-delete",
                        data_cta: "delete",
                        data_model: "Task",
                        data_toggle: "popup",
                        data_target: "#editTaskPopup"
                    },
                    h.i({ class: "fa-regular fa-trash-can" }),
                    h.span({ class: "visually-hidden" }, "Delete task")
                ),
            ),
            ...args
        );
    }

    toggleCompleted(task) {
        broker.emit(
            $e.task.toggleCompleted, payload({ id: task.id })
        );
    }

    update(task) {
        broker.emit(
            $e.task.needs.updateForm, payload(task)
        );
    }

    delete(task) {
        broker.emit(
            $e.task.delete, payload({ id: task.id })
        );
    }
}