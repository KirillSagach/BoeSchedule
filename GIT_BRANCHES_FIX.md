# Исправление проблемы с ветками Git

## Проблема
В репозитории есть ветки с кириллическими названиями, что может вызывать проблемы при мердже:
- `НовыеКолонки`
- `Рефакторинг`
- `Рефакторинг-после-колонок`

## Решение

### Вариант 1: Переименование локальных веток (рекомендуется)

```bash
# Переименовать локальные ветки
git branch -m НовыеКолонки new-columns
git branch -m Рефакторинг refactoring
git branch -m Рефакторинг-после-колонок refactoring-after-columns

# Если ветки уже запушены на удаленный репозиторий, удалить старые и запушить новые
git push origin --delete НовыеКолонки
git push origin --delete Рефакторинг
git push origin --delete Рефакторинг-после-колонок

git push origin new-columns
git push origin refactoring
git push origin refactoring-after-columns
```

### Вариант 2: Удаление ненужных веток

Если ветки больше не нужны:

```bash
# Удалить локальные ветки
git branch -D НовыеКолонки
git branch -D Рефакторинг
git branch -D Рефакторинг-после-колонок

# Удалить удаленные ветки
git push origin --delete НовыеКолонки
git push origin --delete Рефакторинг
git push origin --delete Рефакторинг-после-колонок
```

### Вариант 3: Настройка Git для корректной работы с кириллицей

```bash
# Настроить кодировку для Git
git config --global core.quotepath false
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding utf-8
```

## Рекомендации

1. Используйте только латинские буквы, цифры, дефисы и подчеркивания в названиях веток
2. Избегайте кириллицы в названиях веток и коммитов
3. Используйте осмысленные названия на английском языке

