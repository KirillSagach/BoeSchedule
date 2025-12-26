import { ScheduleItem } from '../types/schedule';

/**
 * Генерирует URL для добавления события в Google Calendar
 */
export function generateGoogleCalendarUrl(item: ScheduleItem): string {
  // Парсим дату из формата DD.MM.YY
  const [day, month, year] = item.date.split('.');
  const fullYear = '20' + year;
  
  // Парсим время из формата HH:MM
  const [hours, minutes] = item.time.split(':');
  
  // Создаем дату начала (в GMT+3, как указано в данных)
  const startDate = new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00+03:00`);
  
  // Создаем дату окончания (предполагаем длительность 2 часа, можно изменить)
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  
  // Форматируем даты для Google Calendar (формат: YYYYMMDDTHHmmssZ для UTC)
  const formatDate = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };
  
  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);
  
  // Формируем название события
  const eventTitle = `${item.championship} - ${item.stage}: ${item.session}`;
  
  // Формируем описание
  const descriptionParts = [
    `Этап: ${item.stage}`,
    `Сессия: ${item.session}`,
    item.place && `Место: ${item.place}`,
    item.Commentator1 && `Комментатор: ${item.Commentator1}`,
    item.Commentator2 && `Комментатор: ${item.Commentator2}`,
    item.Optionally && `Важно: ${item.Optionally}`
  ].filter(Boolean);
  
  const description = descriptionParts.join('\n');
  
  // Кодируем параметры для URL
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle,
    dates: `${startDateStr}/${endDateStr}`,
    details: description,
    location: item.place || ''
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

