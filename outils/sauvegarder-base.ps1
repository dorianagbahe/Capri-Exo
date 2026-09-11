$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$databasePath = Join-Path $projectRoot "backend\db.sqlite3"
$backupDirectory = Join-Path $projectRoot "backend\backups"

if (-not (Test-Path $databasePath)) {
  Write-Host "Aucune base locale à sauvegarder." -ForegroundColor Yellow
  exit 0
}

New-Item -ItemType Directory -Path $backupDirectory -Force | Out-Null
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupPath = Join-Path $backupDirectory "capri-exo_$timestamp.sqlite3"
Copy-Item -LiteralPath $databasePath -Destination $backupPath -Force

Get-ChildItem -LiteralPath $backupDirectory -File -Filter "*.sqlite3" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -Skip 10 |
  Remove-Item -Force

Write-Host "Base locale sauvegardée : $backupPath" -ForegroundColor DarkGreen
