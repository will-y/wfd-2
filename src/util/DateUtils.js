const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const parseDate = dateString => {
    const dateArray = dateString.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    return {
        day: day,
        month: month,
        year: year
    }
}

const getWeekDayName = dayNum => {
    return weekday[dayNum];
}

const getMonthName = monthNum => {
    return monthNames[monthNum];
}

/**
 * Gets the dates between start and end
 * Start and End are in the date picker format (yyy-mm-dd)
 * Ending list is in database format (monthname-dd-yyy)
 */
const getDateStringsBetween = (start, end) => {
    const startDate = datepickerStringToDateObject(start);
    const endDate = datepickerStringToDateObject(end);

    const result = [];
    const endString = dateObjectToDbString(endDate);

    let currentDate = startDate;

    do {
        result.push(dateObjectToDbString(currentDate));
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    } while (result[result.length - 1] !== endString);

    return result;
}

/**
 * Converts a datepicker date string to a date object
 */
const datepickerStringToDateObject = dateString => {
    const d = parseDate(dateString);

    return new Date(d.year, d.month - 1, d.day);
}

const dateObjectToDbString = dateObject => {
    return `${getMonthName(dateObject.getMonth())}-${dateObject.getDate()}-${dateObject.getFullYear()}`;
}

export {parseDate, getWeekDayName, getMonthName, getDateStringsBetween, datepickerStringToDateObject};