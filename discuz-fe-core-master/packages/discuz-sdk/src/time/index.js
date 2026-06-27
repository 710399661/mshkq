import TimeClass from './core';
import {getMonthStartAndEnd, formatDate, isCurrentYear } from './interface';
import {
  getMonthStartAndEnd as getMonthStartAndEndBackend,
  formatDate as formatDateBackend,
  isCurrentYear as isCurrentYearBackend
} from './backend/dayjs';

const timeInstance = new TimeClass();

timeInstance.register('getMonthStartAndEnd', getMonthStartAndEnd, getMonthStartAndEndBackend);
timeInstance.register('formatDate', formatDate, formatDateBackend);
timeInstance.register('isCurrentYear', isCurrentYear, isCurrentYearBackend);

export default timeInstance;
