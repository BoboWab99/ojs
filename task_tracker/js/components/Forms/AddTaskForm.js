class AddTaskForm extends OpenScript.Component {
    render(...args) {
        return h.form(
            {
                class: "task-form",
                name: "taskForm",
                id: "taskForm"
            },

            // input fields
            h.div(
                { class: "inputs" },
                h.input({
                    type: "text",
                    name: "task",
                    id: "taskFormInput",
                    class: "form-input",
                    placeholder: "New task"
                }),
                h.label(
                    { class: "form-date-picker" },
                    h.input({
                        type: "date",
                        name: "due-date",
                        id: "taskFormDatePicker",
                        min: "{today}"
                    }),
                    h.span(
                        {
                            role: "button",
                            class: "icon button button-primary-transparent"
                        },
                        h.i({ class: "fa-regular fa-calendar" })
                    )
                ),
            ),

            // submit button
            h.button(
                {
                    type: "button",
                    class: "button button-primary"
                },
                "Add"
            ),

            ...args
        );
    }

    showDatePicker() {
        dom.id("taskFormDatePicker").showPicker();
    }
}