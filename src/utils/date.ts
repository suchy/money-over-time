import { format } from 'date-fns';

export {
  addDays,
  addWeeks,
  addMonths,
  addQuarters,
  addYears,
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  min,
  startOfDay,
  subDays
} from 'date-fns';

export const formatInputDate = (date: Date | string) => {
  const dateToFormat = typeof date === 'string' ? new Date(date) : date;
  return format(dateToFormat, 'yyyy-MM-dd');
};

export const fullDateFormat = (date: Date | string) => {
  const dateToFormat = typeof date === 'string' ? new Date(date) : date;
  return format(dateToFormat, 'dd.MM.yyyy');
};

export const mockedDate = new Date(1988, 6, 29, 0, 0, 0, 0);
