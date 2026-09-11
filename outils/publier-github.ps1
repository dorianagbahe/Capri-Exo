param(
  [string]$Message = "Mise à jour du site Capri Exo"
)

$ErrorActionPreference = "Stop"
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$dataPath = Join-Path $projectRoot "js\data.js"

function Invoke-CheckedCommand {
  param(
    [string]$Command,
    [string[]]$Arguments
  )

  & $Command @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "La commande '$Command' a échoué."
  }
}

Set-Location $projectRoot

if (-not (Test-Path (Join-Path $projectRoot ".git"))) {
  throw "Ce dossier n'est pas relié à Git."
}

$source = [IO.File]::ReadAllText($dataPath)
$catalogStart = $source.IndexOf("const products = [")
$catalogEnd = $source.IndexOf("];", $catalogStart)

if ($catalogStart -lt 0 -or $catalogEnd -le $catalogStart) {
  throw "Le catalogue de js/data.js est introuvable."
}

$catalog = $source.Substring($catalogStart, $catalogEnd - $catalogStart)
$productIds = [regex]::Matches($catalog, '(?m)^\s*id:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
$duplicateIds = $productIds | Group-Object | Where-Object { $_.Count -gt 1 }

if ($duplicateIds) {
  throw "Identifiants produits en double : $($duplicateIds.Name -join ', ')"
}

$missingImages = [regex]::Matches($catalog, 'image:\s*"([^"]*)"') |
  ForEach-Object { $_.Groups[1].Value } |
  Where-Object { $_ -and $_ -notmatch '^https?://' } |
  Where-Object { -not (Test-Path (Join-Path $projectRoot $_)) } |
  Sort-Object -Unique

if ($missingImages) {
  throw "Images manquantes : $($missingImages -join ', ')"
}

if ($catalog -match 'image:\s*"[^"]*\\') {
  throw "Un chemin d'image contient un antislash. Utilisez images/nom-du-fichier.ext."
}

Write-Host "$($productIds.Count) produits vérifiés, sans doublon ni image manquante." -ForegroundColor Green

& (Join-Path $PSScriptRoot "sauvegarder-base.ps1")
Invoke-CheckedCommand -Command "py" -Arguments @("backend\manage.py", "check")
Invoke-CheckedCommand -Command "git" -Arguments @("diff", "--check")

$changes = git status --porcelain
if (-not $changes) {
  Write-Host "Aucune modification à publier." -ForegroundColor Yellow
  exit 0
}

Invoke-CheckedCommand -Command "git" -Arguments @("add", "-A")
Invoke-CheckedCommand -Command "git" -Arguments @("commit", "-m", $Message)
Invoke-CheckedCommand -Command "git" -Arguments @("push", "origin", "main")

Write-Host "Publication terminée : https://dorianagbahe.github.io/Capri-Exo/" -ForegroundColor Green
