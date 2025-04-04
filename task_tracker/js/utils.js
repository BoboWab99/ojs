/**
 * Capitalize each word of a String
 * @returns 
 */
String.prototype.capitalize = function () {
    return this
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" ");
}

String.prototype.isEmpty = function () {
    return this.trim() == "";
}

String.prototype.isNotEmpty = function () {
    return this.trim() != "";
}

/**
 * Create unique ID by combining current timestamp and
 * random numbers to reduce likelihood of crashes.
 * @returns 
 */
function __uid__() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 12).padStart(12, 0)}`;
}

/**
 * App theme color names
 */
const appThemeColors = Object.freeze({
    BLUE: "blue",
    TEAL: "teal",
    GREEN: "green",
    PURLPLE: "purple"
});


/**
 * Returns the theme color name saved (locally)
 * @returns 
 */
function colorTheme() {
    return localStorage.getItem("task_tracker_app_color_theme");
}

/**
 * Adds `color` to HTML and saves it (locally) if `store == true`
 * @param {String} color defaults to `true`
 * @returns 
 */
function setColorTheme(color, store = true) {
    if (store) localStorage.setItem("task_tracker_app_color_theme", color);
    dom.html().setAttribute("data-theme", color);
}


/**
 * Current date (YYYY-MM-DD) adjusted for timezone offset
 * @returns 
 */
function dateForInput() {
    const date = new Date();
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().split("T")[0];
}