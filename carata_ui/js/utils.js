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
 * Current date (YYYY-MM-DD) adjusted for timezone offset
 * @returns 
 */
function dateForInput() {
    const date = new Date();
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().split("T")[0];
}