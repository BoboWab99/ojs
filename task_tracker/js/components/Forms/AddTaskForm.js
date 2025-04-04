class AddTaskForm extends OpenScript.Component {
    pickedDate = state(null);

    render(...args) {
        return h.div(
            h.form(
                {
                    onsubmit: this.method("submit", "${event}"),
                    onreset: this.method("reset", "${event}"),
                    class: "task-form",
                    name: "taskForm",
                    id: "taskForm",
                    method: "POST"
                },
                // input fields
                h.div(
                    { class: "inputs" },
                    h.input({
                        type: "text",
                        required: "",
                        name: "task",
                        id: "taskFormInput",
                        class: "form-input",
                        placeholder: "New task"
                    }),
                    h.label(
                        {
                            class: "form-date-picker",
                            title: "Pick due date"
                        },
                        h.input({
                            oninput: this.method("setPickedDate"),
                            type: "date",
                            name: "due-date",
                            id: "taskFormDatePicker",
                            min: dateForInput(),
                            tabindex: "-1"
                        }),
                        h.span(
                            {
                                onclick: this.method("showDatePicker"),
                                role: "button",
                                class: "icon button button-primary-transparent",
                                tabindex: "0"
                            },
                            h.i({ class: "fa-regular fa-calendar" })
                        )
                    ),
                ),
                // submit button
                h.button(
                    {
                        type: "submit",
                        class: "button button-primary"
                    },
                    "Add"
                ),
            ),
            v(this.pickedDate, function (pickedDate) {
                if (!pickedDate.value) return "";
                return h.div({ class: "form-date-holder" }, pickedDate.value);
            }),
            ...args
        );
    }

    async submit(event) {
        event.preventDefault();
        const form = event.target;
        await broker.emit(
            $e.task.create, payload({
                task: dom.field("taskFormInput", form).value,
                dueDate: dom.field("taskFormDatePicker", form).value
            })
        );
        form.reset();
        // console.log("Request to submit", event.target.id);
    }

    reset(event) {
        // defer execution until after the reset operation completes
        Promise.resolve().then(() => {
            this.setPickedDate();
        });
    }

    setPickedDate() {
        this.pickedDate.value = dom.get("#taskFormDatePicker").value;
    }

    showDatePicker() {
        dom.get("#taskFormDatePicker").showPicker();
    }
}