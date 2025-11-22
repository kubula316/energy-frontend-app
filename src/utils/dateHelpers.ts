import { format, parseISO, isToday, isTomorrow, differenceInDays, startOfDay } from 'date-fns';
import { pl } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMMM yyyy', { locale: pl });
  } catch {
    return dateString;
  }
};

export const formatDateWithTime = (dateTimeString: string): string => {
  try {
    const date = parseISO(dateTimeString);
    return format(date, 'd MMMM, HH:mm', { locale: pl });
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
      return 'Dzisiaj';
    }
    
    if (isTomorrow(date)) {
      return 'Jutro';
    }
    
    const daysDiff = differenceInDays(targetDate, today);
    
    if (daysDiff === 2) {
      return 'Pojutrze';
    }
    
    if (daysDiff > 0 && daysDiff <= 7) {
      return `Za ${daysDiff} dni`;
    }
    
    if (daysDiff < 0 && daysDiff >= -7) {
      return `${Math.abs(daysDiff)} dni temu`;
    }
    
    return formatDate(dateString);
  } catch {
    return dateString;
  }
};
