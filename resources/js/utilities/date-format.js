import dayjs from "dayjs";

/**
 * format date to DD MM, YYYY ie 02 Dec, 1996
 *
 * @param {string} date
 * @returns string
 */
export function toDateString(date) {
    return dayjs(date).format('DD MMM, YYYY');
}



/**
 * format date to DD MM, YYYY HH:mm ie 02 Dec, 1996 20:22
 *
 * @param {string} date
 * @returns string
 */
export function toDateTimeString(date) {
    return dayjs(date).format('DD MMM, YYYY HH:mm');
}

export function toDateTimeWithSecondsString(date) {
    return dayjs(date).format('DD MMM, YYYY HH:mm:ss');
}

export function convertTimestampToLocalTime(timestamp) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

    // Get the browser's timezone offset in minutes
    const timezoneOffsetInMinutes = date.getTimezoneOffset();

    // Apply the offset to the timestamp
    // const localTimestamp = timestamp - (timezoneOffsetInMinutes * 60);
    // Create a new Date object with the adjusted timestamp
    const localDate = new Date(timestamp * 1000);

    // Format the local date as a string
    return localDate.toLocaleString();
};
