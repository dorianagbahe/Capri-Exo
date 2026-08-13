@echo off
set "SCRIPT=%~dp0surveiller-brouillon.ps1"
start "Capri Exo - Synchronisation" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%"

