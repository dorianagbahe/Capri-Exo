$source = Split-Path -Parent $PSScriptRoot
$destination = Join-Path (Split-Path -Parent $source) 'capri brouillon'
$generator = Join-Path $PSScriptRoot 'generer-brouillon.ps1'
$pidFile = Join-Path $PSScriptRoot 'synchronisation.pid'
$logFile = Join-Path $PSScriptRoot 'synchronisation.log'

function Write-SyncLog {
  param([string]$Message)

  $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Message"
  Add-Content -LiteralPath $logFile -Value $line -Encoding UTF8
}

function Update-Draft {
  try {
    & $generator -Source $source -Destination $destination
    Write-SyncLog 'Brouillon mis à jour.'
  } catch {
    Write-SyncLog "Erreur : $($_.Exception.Message)"
  }
}

Set-Content -LiteralPath $pidFile -Value $PID -Encoding ASCII
Write-SyncLog 'Synchronisation démarrée.'
Update-Draft

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $source
$watcher.Filter = '*'
$watcher.IncludeSubdirectories = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]'FileName, DirectoryName, LastWrite, Size'
$watcher.EnableRaisingEvents = $true

try {
  while ($true) {
    $change = $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::All, 1000)
    if ($change.TimedOut) {
      continue
    }

    $relativePath = $change.Name
    if ($relativePath -match '^(\.git|outils)(\\|$)') {
      continue
    }

    Start-Sleep -Milliseconds 700

    while (-not $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::All, 200).TimedOut) {
      # Regroupe les événements produits par une même sauvegarde de fichier.
    }

    Update-Draft
  }
} finally {
  $watcher.Dispose()
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
  Write-SyncLog 'Synchronisation arrêtée.'
}


