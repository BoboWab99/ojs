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