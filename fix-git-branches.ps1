# Скрипт для исправления веток Git с кириллическими названиями
# Запуск: .\fix-git-branches.ps1

Write-Host "Исправление веток Git с кириллическими названиями..." -ForegroundColor Yellow

# Переименование локальных веток
Write-Host "`nПереименование локальных веток..." -ForegroundColor Cyan

if (git branch --list "НовыеКолонки" 2>$null) {
    git branch -m "НовыеКолонки" "new-columns"
    Write-Host "  ✓ Переименована ветка: НовыеКолонки -> new-columns" -ForegroundColor Green
}

if (git branch --list "Рефакторинг" 2>$null) {
    git branch -m "Рефакторинг" "refactoring"
    Write-Host "  ✓ Переименована ветка: Рефакторинг -> refactoring" -ForegroundColor Green
}

if (git branch --list "Рефакторинг-после-колонок" 2>$null) {
    git branch -m "Рефакторинг-после-колонок" "refactoring-after-columns"
    Write-Host "  ✓ Переименована ветка: Рефакторинг-после-колонок -> refactoring-after-columns" -ForegroundColor Green
}

# Удаление удаленных веток с кириллицей
Write-Host "`nУдаление удаленных веток с кириллицей..." -ForegroundColor Cyan

$remoteBranches = @("НовыеКолонки", "Рефакторинг", "Рефакторинг-после-колонок")

foreach ($branch in $remoteBranches) {
    $exists = git ls-remote --heads origin $branch 2>$null
    if ($exists) {
        git push origin --delete $branch 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ Удалена удаленная ветка: $branch" -ForegroundColor Green
        }
    }
}

# Пуш новых веток (если они существуют)
Write-Host "`nОтправка переименованных веток на удаленный репозиторий..." -ForegroundColor Cyan

$newBranches = @("new-columns", "refactoring", "refactoring-after-columns")

foreach ($branch in $newBranches) {
    $exists = git branch --list $branch 2>$null
    if ($exists) {
        git push origin $branch 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ Отправлена ветка: $branch" -ForegroundColor Green
        }
    }
}

Write-Host "`nГотово! Проверьте результат командой: git branch -a" -ForegroundColor Green

