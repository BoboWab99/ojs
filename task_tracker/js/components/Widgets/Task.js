class TaskListWidget extends OpenScript.Component {
    render(tasks, ...args) {
        return h.ol(
            { class: "task-list" },
            each(tasks, (task) => h.TaskWidget(task)),
            ...args
        );
    }
}

class TaskWidget extends OpenScript.Component {
    render(task, ...args) {
        return h.li(
            { class: "task-list-item" },
            h.CheckWidget(
                false,
                task.isCompleted,
                { onchange: this.method("toggleCompleted", task) },
                undefined,
                { title: "Mark as complete" },
            ),
            h.div(
                { class: "content" },
                h.span(
                    { data_task_attr: "task" },
                    task.content
                ),
                h.div(
                    { class: "due-date" },
                    h.i({ class: "fa-regular fa-calendar" }),
                    h.span(
                        { data_task_attr: "dueDate" },
                        task.dueDate
                    ),
                ),
            ),
            h.div(
                { class: "options" },
                h.button(
                    {
                        onclick: this.method("editTask", ["${this}", task]),
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
                        onclick: this.method("deleteTask", task),
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
        console.log("Requesting task complete", task);
    }

    editTask(trigger, task) {
        const form = dom.form("editTaskForm");
        dom.field("editTaskInput", form).value = task.content;
        dom.field("editTaskDate", form).value = task.dueDate;
        dom.field("editTaskCheck", form).checked = task.isCompleted;
        openPopup(trigger);
    }

    deleteTask(task) {
        console.log("Requesting task delete", task);
    }
}