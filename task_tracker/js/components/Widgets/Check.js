class CheckWidget extends OpenScript.Component {
    render(isRadio, isChecked, inputAttrs, label, ...args) {
        // [isChecked] is a [Boolean] indicating whether this is checked when page loads
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#checked
        const checkedAttr = isChecked ? { checked: "" } : {};
        const type = isRadio ? "radio" : "checkbox";
        return h.label(
            { class: "check" },
            h.input({
                type: type,
                hidden: "",
                ...inputAttrs,
                ...checkedAttr
            }),
            h.span(
                { class: "icon" },
                h.i({ class: "fa-regular fa-circle" }),
                // The transition "fa-regular fa-circle" → "fa-solid fa-check-circle"
                // is handled from CSS using the checked attribute
            ),
            label ? h.span({ class: "check-label" }, label) : "",
            ...args
        );
    }
}