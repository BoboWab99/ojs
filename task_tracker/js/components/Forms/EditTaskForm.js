class EditTaskForm extends OpenScript.Component {
    render(task, ...args) {
        return h.form(
            {
                onsubmit: this.method("onSubmit", "${event}"),
                name: `task-upd-form-${task.id}`,
                class: "form-field-group",
                method: "POST",
            },
            h.div(
                { class: "form-field" },
                h.label(
                    {
                        for: "editTaskInput",
                        hidden: ""
                    },
                    "Task description"
                ),
                h.input({
                    type: "text",
                    required: "",
                    value: task.task,
                    class: "form-input",
                    id: "editTaskInput",
                    placeholder: "Task"
                })
            ),
            h.div(
                { class: "form-field" },
                h.label(
                    {
                        for: "editTaskDate",
                        hidden: ""
                    },
                    "Task due date"
                ),
                h.input({
                    type: "date",
                    value: task.dueDate,
                    class: "form-input",
                    id: "editTaskDate",
                    min: dateForInput()
                })
            ),
            h.div(
                { class: "form-field" },
                h.CheckWidget(false, task.isCompleted, { id: "editTaskCheck" }, "Mark as Complete")
            ),
            ...args
        );
    }

    $$task = {
        needs: {
            updateForm: (ed, _) => this.open(ed)
        }
    };

    onSubmit(event) {
        event.preventDefault();
        const uid = event.target
            .closest("[data-popup-id]")
            .getAttribute("data-popup-id");
        dom.id(`popup-button-right-${uid}`).click();
    }

    open(ed) {
        const { message } = EventData.parse(ed);
        const options = Popup.options();
        options.buttons.right.callback = () => {
            this.submitForm(message.id);
        }
        Popup.open({
            title: "Test something!",
            content: h.EditTaskForm(message),
            options: options
        });
    }

    submitForm(taskId) {
        const form = dom.form(`task-upd-form-${taskId}`);
        broker.emit($e.task.update, payload({
            id: taskId,
            task: dom.field("editTaskInput", form).value,
            dueDate: dom.field("editTaskDate", form).value,
            isCompleted: dom.field("editTaskCheck", form).checked
        }));
    }
}