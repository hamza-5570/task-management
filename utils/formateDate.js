export const formatDateToString = (date, time) => {
    const [hours, minutes] = time.split(":");
    const formattedDate = new Date(date);

    formattedDate.setHours(hours, minutes, 0, 0);

    const formattedTime =
        formattedDate.getFullYear() +
        "-" +
        String(formattedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(formattedDate.getDate()).padStart(2, "0") +
        "T" +
        String(formattedDate.getHours()).padStart(2, "0") +
        ":" +
        String(formattedDate.getMinutes()).padStart(2, "0");

    return formattedTime;
};


export const getEndTime = (date) => {
    const extractedDate = new Date(date).toISOString().substring(0, 10);
    const endofDay = new Date(extractedDate);
    endofDay.setUTCHours(23, 59, 59, 999);

    return endofDay.toISOString().substring(0, 16);
}
