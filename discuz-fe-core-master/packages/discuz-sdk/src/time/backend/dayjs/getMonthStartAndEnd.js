import dayJs from 'dayjs';
export const getMonthStartAndEnd = (formattedData = '') => {
  const targetMonth = dayJs(formattedData).get('month');
  const monthStartDate = dayJs(formattedData).month(targetMonth)
    .startOf('month')
    .format('YYYY-MM-DD');
  const monthEndDate =  dayJs(formattedData).month(targetMonth)
    .endOf('month')
    .format('YYYY-MM-DD');
  return [monthStartDate, monthEndDate];
};

