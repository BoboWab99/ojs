class AppThemeForm extends OpenScript.Component {
    render(...args) {
        return h.div(
            {
                class: "popup",
                id: "appThemePopup"
            },
            h.div(
                { class: "popup-shadow" },
                h.form(
                    {
                        onsubmit: this.method("switchAppTheme", "${event}"),
                        class: "popup-content",
                        action: "#",
                        method: "get",
                        id: "appThemeForm"
                    },
                    h.div(
                        { class: "popup-header" },
                        h.h3(
                            { class: "popup-title" },
                            "Change app theme".capitalize()
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
                        each(Object.values(appThemeColors), (color) => {
                            return h.div(
                                { class: "form-field" },
                                h.CheckWidget(
                                    true,
                                    color == colorTheme(),
                                    { name: "toggle-theme", value: color },
                                    color.capitalize()
                                )
                            );
                        }),
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

    switchAppTheme(event) {
        event.preventDefault();
        const form = event.target;
        setColorTheme(dom.field("toggle-theme", form).value);
        form.reset();
        this.closeThis();
    }

    closeThis() {
        closePopup(dom.get("#appThemePopup"));
    }
}