class HeaderWidget extends OpenScript.Component {
    render(...args) {
        return h.header(
            { class: "header" },
            h.div(
                { class: "header-inner" },
                h.div(
                    { class: "container" },
                    h.div(
                        { class: "header-logo" },
                        h.a(
                            {
                                href: "/",
                                class: "logo"
                            },
                            h.span("@"),
                            "Todo"
                        )
                    ),
                    h.div(
                        { class: "header-quote" },
                        h.p(
                            { id: "quote" },
                            "Either you run the day or the day runs you."
                        )
                    ),
                    h.div(
                        { class: "header-right" },
                        h.button(
                            {
                                onclick: this.method("openThemePopup", "${this}"),
                                type: "button",
                                class: "button button-primary button-theme-toggle",
                                title: "Change Theme",
                                data_toggle: "popup",
                                data_target: "#appThemePopup"
                            },
                            h.span(
                                { class: "icon" },
                                h.i({
                                    class: "fa-solid fa-moon",
                                    aria_hidden: "true"
                                })
                            )
                        ),
                        h.div(
                            { class: "header-date" },
                            h.span(
                                { class: "day-of-week" },
                                (new Date()).toLocaleDateString('en-US', { weekday: 'long' })
                            ),
                            h.span(
                                { class: "date" },
                                (new Date()).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })
                            )
                        )
                    )
                )
            ),
            ...args
        );
    }

    openThemePopup(trigger) {
        // select radio with currently save theme color
        dom.get(`[name="toggle-theme"][value="${colorTheme()}"]`).checked = true;
        openPopup(trigger);
    }
}