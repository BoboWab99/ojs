// Add listeners for opening/closing .popup elements
// All .popup elements are selected by their 'id'.
// All 'toggle' buttons have [data-target="#popupId"]

// This won't be useful in OJS 'coz of asynchronous rendering
window.addEventListener('DOMContentLoaded', () => {
    dom.all('[data-toggle="popup"]').forEach(button => {
        button.setAttribute('onclick', 'openPopup(this)');
    });
    dom.all('[data-close="popup"]').forEach(button => {
        button.setAttribute('onclick', 'closePopup(this)');
    });
});


/**
 * @param {HTMLElement} popupOrToggle 
 */
function openPopup(popupOrToggle) {
    let popup = null;
    if (popupOrToggle.classList.contains('popup')) {
        popup = popupOrToggle;
    } else if (popupOrToggle.hasAttribute('data-toggle') &&
        popupOrToggle.getAttribute('data-toggle') == 'popup') {
        popup = dom.get(popupOrToggle.getAttribute('data-target'));
        // Note: 'toggle' buttons have [data-target="#popupId"]
    }
    if (popup) {
        popup.classList.add('show');
        console.log('Opened popup', `#${popup.id}`);
    }
}


/**
 * @param {HTMLElement} popupOrToggle 
 */
function closePopup(popupOrToggle) {
    let popup = null;
    if (popupOrToggle.classList.contains('popup')) {
        popup = popupOrToggle;
    } else if (popupOrToggle.hasAttribute('data-close') &&
        popupOrToggle.getAttribute('data-close') == 'popup') {
        popup = popupOrToggle.closest('.popup.show');
        // Note: 'close' buttons are children of .popup
    }
    if (popup) {
        popup.classList.remove('show');
        console.log('Closed popup', `#${popup.id}`);
    }
}


class Popup {
    /**
     * Copy and edit to customize dialog options
     * @returns 
     */
    static options() {
        return {
            dismissible: true,
            buttons: {
                left: {
                    type: "button",
                    text: "Cancel",
                    visible: true,
                    hidesPopup: true,
                    callback: (uid) => { }
                },
                right: {
                    type: "button",
                    text: "Save",
                    visible: true,
                    hidesPopup: true,
                    callback: (uid) => { }
                }
            }
        };
    }

    /**
     * Creates a Popup in real-time. Return its uid.
     * Button callbacks take in the popup's uid
     */
    static open({
        title,
        content,
        options = {
            dismissible: true,
            buttons: {
                left: {
                    type: "button",
                    text: "Cancel",
                    visible: true,
                    hidesPopup: true,
                    callback: (uid) => { }
                },
                right: {
                    type: "button",
                    text: "Save",
                    visible: true,
                    hidesPopup: true,
                    callback: (uid) => { }
                }
            }
        }
    } = {}) {
        const popupTransitionDuration = 1.1 * 100; // 100ms in CSS
        const hiddenAttrLeft = options.buttons.left.visible ? {} : { hidden: "" };
        const hiddenAttrRight = options.buttons.right.visible ? {} : { hidden: "" };
        const uid = __uid__();

        const popup = h.div(
            {
                id: `popup-${uid}`,
                class: "popup"
            },
            h.div(
                {
                    id: `popup-shadow-${uid}`,
                    class: "popup-shadow"
                },
                h.div(
                    {
                        id: `popup-content-${uid}`,
                        class: "popup-content"
                    },
                    h.div(
                        {
                            id: `popup-header-${uid}`,
                            class: "popup-header"
                        },
                        h.h3(
                            {
                                id: `popup-title-${uid}`,
                                class: "popup-title"
                            },
                            title.capitalize()
                        ),
                        h.button(
                            {
                                id: `popup-button-close-${uid}`,
                                class: "button button-close",
                                type: "button",
                                data_close: "popup"
                            },
                            h.span("+")
                        )
                    ),
                    h.div(
                        {
                            id: `popup-body-${uid}`,
                            class: "popup-body"
                        },
                        content
                    ),
                    h.div(
                        {
                            id: `popup-footer-${uid}`,
                            class: "popup-footer"
                        },
                        h.button(
                            {
                                type: options.buttons.left.type,
                                class: "popup-button-left button button-danger",
                                id: `popup-button-left-${uid}`,
                                ...hiddenAttrLeft
                            },
                            options.buttons.left.text
                        ),
                        h.button(
                            {
                                type: options.buttons.right.type,
                                class: "popup-button-right button button-primary",
                                id: `popup-button-right-${uid}`,
                                ...hiddenAttrRight
                            },
                            options.buttons.right.text
                        )
                    )
                )
            )
        );

        // Attach popup to DOM in a wrapper
        h.div(popup, {
            parent: context("root").dialogRoot,
            id: `popup-wrapper-${uid}`,
            data_popup_id: uid
        });

        // Destroy function
        const destroyIfDissmissible = () => {
            if (options.dismissible) {
                setTimeout(() => {
                    dom.id(`popup-wrapper-${uid}`).remove();
                }, popupTransitionDuration);
            }
        }

        // Event listeners on action buttons
        dom.id(`popup-button-close-${uid}`).addEventListener("click", function () {
            closePopup(this);
            destroyIfDissmissible();
        });

        dom.id(`popup-button-left-${uid}`).addEventListener("click", function () {
            options.buttons.left.callback(uid);
            if (options.buttons.left.hidesPopup) {
                closePopup(this);
            }
            destroyIfDissmissible();
        });

        dom.id(`popup-button-right-${uid}`).addEventListener("click", function () {
            options.buttons.right.callback(uid);
            if (options.buttons.right.hidesPopup) {
                closePopup(this);
            }
            destroyIfDissmissible();
        });

        // Display popup
        openPopup(dom.id(`popup-${uid}`));

        return uid;
    }
}