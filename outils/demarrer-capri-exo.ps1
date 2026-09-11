$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$backendRoot = Join-Path $projectRoot "backend"

function Test-LocalPort {
  param([int]$Port)

  $client = New-Object System.Net.Sockets.TcpClient
  try {
    $client.Connect("127.0.0.1", $Port)
    return $true
  } catch {
    return $false
  } finally {
    $client.Dispose()
  }
}

if (-not (Test-Path (Join-Path $backendRoot "manage.py"))) {
  throw "Le dossier backend est incomplet."
}

if (-not (Test-LocalPort -Port 8000)) {
  $backendProcess = Start-Process -FilePath "py" -ArgumentList "manage.py", "runserver", "127.0.0.1:8000", "--noreload" -WorkingDirectory $backendRoot -WindowStyle Hidden -PassThru
  [IO.File]::WriteAllText((Join-Path $PSScriptRoot "backend.pid"), [string]$backendProcess.Id)
}

if (-not (Test-LocalPort -Port 8017)) {
  $frontendProcess = Start-Process -FilePath "py" -ArgumentList "-m", "http.server", "8017", "--bind", "127.0.0.1" -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru
  [IO.File]::WriteAllText((Join-Path $PSScriptRoot "frontend.pid"), [string]$frontendProcess.Id)
}

Start-Sleep -Seconds 2
Start-Process "http://127.0.0.1:8017/"

Write-Host "Capri Exo est disponible sur http://127.0.0.1:8017/" -ForegroundColor Green
Write-Host "Administration : http://127.0.0.1:8000/admin/" -ForegroundColor Green
