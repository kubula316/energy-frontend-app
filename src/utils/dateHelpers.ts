import { format, parseISO, isToday, isTomorrow, differenceInDays, startOfDay } from 'date-fns';
import { enGB } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMMM yyyy', { locale: enGB });
  } catch {
    return dateString;
  }
};

export const formatDateWithTime = (dateTimeString: string): string => {
  try {
    const date = parseISO(dateTimeString);
    return format(date, 'd MMMM, HH:mm', { locale: enGB });
  } catch {
    return dateTimeString;
  }
};

export const getDateLabel = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const today = startOfDay(new Date());
    const targetDate = startOfDay(date);
    
    if (isToday(date)) {
      return 'Today';
    }
    
    if (isTomorrow(date)) {
      return 'Tomorrow';
    }
    
    const daysDiff = differenceInDays(targetDate, today);
    
    if (daysDiff === 2) {
      return 'Day after tomorrow';
    }
    
    if (daysDiff > 0 && daysDiff <= 7) {
      return `In ${daysDiff} days`;
    }
    
    if (daysDiff < 0 && daysDiff >= -7) {
      return `${Math.abs(daysDiff)} days ago`;
    }
    
    return formatDate(dateString);
  } catch {
    return dateString;
  }
};
