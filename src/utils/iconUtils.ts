import { ScheduleItem } from '../types/schedule';
import { parseBooleanFlag } from './flagUtils';

/**
 * Формирует массив номеров для иконок телеграмма из ScheduleItem
 */
export function getTgNumbers(item: ScheduleItem): number[] {
  return [
    parseBooleanFlag(item.TG1) && 1,
    parseBooleanFlag(item.TG2) && 2,
    parseBooleanFlag(item.TG3) && 3
  ].filter((num): num is number => typeof num === 'number');
}

/**
 * Формирует массив номеров для иконок телевизора из ScheduleItem
 */
export function getBcuNumbers(item: ScheduleItem): number[] {
  return [
    parseBooleanFlag(item.BCU1) && 1,
    parseBooleanFlag(item.BCU2) && 2,
    parseBooleanFlag(item.BCU3) && 3
  ].filter((num): num is number => typeof num === 'number');
}

