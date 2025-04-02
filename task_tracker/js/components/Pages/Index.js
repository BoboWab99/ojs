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
                    h.TaskListWidget([
                        {
                            content: "Do something",
                            dueDate: "2025-04-15",
                            isCompleted: true
                        },
                        {
                            content: "Do another thing",
                            dueDate: "2025-04-15"
                        },
                    ]),
                ),
            ),
            ...args
        );
    }
}


class DialogContainer extends OpenScript.Component {
    async mount() {
        await super.mount();
        req("Forms.EditTaskForm");
        req("Forms.AppThemeForm");
    }

    render(...args) {
        return h.div(
            {},
            h.EditTaskForm(),
            h.AppThemeForm(),
            ...args
        );
    }
}