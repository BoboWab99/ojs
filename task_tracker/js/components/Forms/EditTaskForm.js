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
                        class: "popup-content",
                        action: "#",
                        method: "POST",
                        id: "editTaskForm"
                    },
                    h.div(
                        { class: "popup-header" },
                        h.h3(
                            { class: "popup-title" },
                            "Edit task".capitalize()
                        ),
                        h.button(
                            {
                                onclick: this.method("closeThis"),
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
                                class: "form-input",
                                id: "editTaskInput"
                            })
                        ),
                        h.div(
                            { class: "form-field" },
                            h.label(
                                {
                                    for: "editTaskInput",
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
                                onclick: this.method("closeThis"),
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

    closeThis() {
        closePopup(dom.get("#editTaskPopup"));
    }
}