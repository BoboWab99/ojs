class HeaderWidget extends OpenScript.Component {
    quotes = [
        "Hard work beats talent when talent doesn't work hard.",
        "Concentrate all your thoughts upon the work in hand. ",
        "Either you run the day or the day runs you.",
        "I'm a greater believer in luck, and I find the harder I work the more I have of it.",
        "When we strive to become better than we are, everything around us becomes better too."
    ];

    quote = state(this.quotes[0]);

    /**
     * Infinitely loop through the quotes and show one at a time
     * @param {Array} quotes list of quotes
     * @param {Number} after change quote after {after} seconds
     */
    loopQuotes(quotes = [], after = 7500) {
        let index = 0;
        const run = () => {
            this.quote.value = quotes[index];
            index = (index + 1) % quotes.length;
            setTimeout(run, after);
        };
        run();
    }

    async mount() {
        await super.mount();
        this.loopQuotes(this.quotes);
    }

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
                            v(this.quote, (q) => h.span(q.value))
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