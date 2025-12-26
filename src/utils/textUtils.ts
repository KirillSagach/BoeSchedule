// Утилиты для форматирования текста

/**
 * Форматирует название чемпионата (добавляет точку в конце, если её нет)
 */
export function formatChampionship(championship?: string): string {
  if (!championship) return '';
  const champ = championship.trim();
  return champ.endsWith('.') ? champ : champ + '.';
}

/**
 * Форматирует название этапа (убирает точку в конце, если она есть)
 */
export function formatStage(stage?: string): string {
  if (!stage) return '';
  const stageText = stage.trim();
  return stageText.endsWith('.') ? stageText.slice(0, -1) : stageText;
}

