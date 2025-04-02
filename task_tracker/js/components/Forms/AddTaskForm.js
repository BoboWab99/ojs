class AddTaskForm extends OpenScript.Component {
    pickedDate = state(null);

    render(...args) {
        return h.div(
            h.form(
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
                        {
                            class: "form-date-picker",
                            title: "Pick due date"
                        },
                        h.input({
                            // listeners: {
                            //     change: function () {
                            //         component("AddTaskForm").pickedDate.value = this.value;
                            //     }
                            // },
                            onchange: this.method("setPickedDate"),
                            type: "date",
                            name: "due-date",
                            id: "taskFormDatePicker",
                            min: dateForInput()
                            // hidden: "", // places the picker in the top-left corner of the browser
                        }),
                        h.span(
                            {
                                onclick: this.method("showDatePicker"),
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

    setPickedDate() {
        this.pickedDate.value = dom.get("#taskFormDatePicker").value;
    }

    showDatePicker() {
        dom.get("#taskFormDatePicker").showPicker();
    }
}