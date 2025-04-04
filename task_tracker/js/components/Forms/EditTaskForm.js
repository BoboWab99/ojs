class EditTaskForm extends OpenScript.Component {
    render(...args) {
        return h.div(
            {
                class: "popup",
                id: "editTaskPopup"
            },
            h.div(
                { class: "popup-shadow" },
                h.form(
                    {
                        onsubmit: this.method("submit", "${event}"),
                        class: "popup-content",
                        name: "editTaskForm",
                        id: "editTaskForm",
                        method: "POST"
                    },
                    h.div(
                        { class: "popup-header" },
                        h.h3(
                            { class: "popup-title" },
                            "Edit task".capitalize()
                        ),
                        h.button(
                            {
                                onclick: this.method("close"),
                                class: "button button-close",
                                type: "reset",
                                data_close: "popup"
                            },
                            h.span("+")
                        )
                    ),
                    h.div(
                        { class: "popup-body" },
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
                                class: "form-input",
                                id: "editTaskDate",
                                min: dateForInput()
                            })
                        ),
                        h.div(
                            { class: "form-field" },
                            h.label(
                                { class: "check" },
                                h.input({
                                    type: "checkbox",
                                    id: "editTaskCheck"
                                }),
                                h.span(
                                    { class: "icon" },
                                    h.i({
                                        class: "fa-regular fa-circle",
                                        aria_hidden: "true"
                                    })
                                ),
                                h.span(
                                    { class: "check-label" },
                                    "Mark as Complete"
                                )
                            )
                        )
                    ),
                    h.div(
                        { class: "popup-footer" },
                        h.button(
                            {
                                onclick: this.method("close"),
                                type: "reset",
                                class: "button button-danger",
                                data_close: "popup"
                            },
                            "Cancel"
                        ),
                        h.button(
                            {
                                type: "submit",
                                class: "button button-primary",
                                id: "editTaskSave"
                            },
                            "Save"
                        )
                    )
                )
            ),
            ...args
        );
    }

    $$task = {
        needs: {
            updateForm: (ed, _) => this.open(ed)
        }
    };

    submit(event) {
        event.preventDefault();
        console.log("Request to submit", event.target.id);
    }

    open(ed) {
        const { message } = EventData.parse(ed);
        const form = dom.form("editTaskForm");
        dom.field("editTaskInput", form).value = message.content;
        dom.field("editTaskDate", form).value = message.dueDate;
        dom.field("editTaskCheck", form).checked = message.isCompleted;
        openPopup(dom.get("#editTaskPopup"));
    }

    close() {
        closePopup(dom.get("#editTaskPopup"));
        // dom.form("editTaskForm").reset(); // buttons are of [type=reset]
    }
}