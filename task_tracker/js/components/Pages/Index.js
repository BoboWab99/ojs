class IndexPage extends OpenScript.Component {
    async mount() {
        await super.mount();
        req("Widgets.Check");
        req("Widgets.Header");
        req("Widgets.Task");
        req("Forms.AddTaskForm");
    }

    render(...args) {
        return h.div(
            h.HeaderWidget(),
            h.div(
                { class: "main" },
                h.div(
                    { class: "container" },
                    h.AddTaskForm(),
                    h.h1(
                        { hidden: "" },
                        "TodoList App"
                    ),
                    h.TaskListWidget(),
                ),
            ),
            ...args
        );
    }
}


class DialogContainer extends OpenScript.Component {
    // Container for all dialogs/popups
    async mount() {
        await super.mount();
        req("Forms.EditTaskForm");
        req("Forms.AppThemeForm");
    }

    // Load those that don't need to be dynamically generated
    render(...args) {
        return h.div(
            h.AppThemeForm(),
            ...args
        );
    }
}