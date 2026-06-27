import dayJs from 'dayjs';
export const isCurrentYear = (date) => {
    const currentYear = dayJs().year();
    const dateYear = dayJs(date).year();

    if (currentYear === dateYear) {
        return true;
    }

    return false;
}
