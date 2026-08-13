@echo off
set "PIDFILE=%~dp0synchronisation.pid"

if not exist "%PIDFILE%" (
  echo La synchronisation n'est pas active.
  pause
  exit /b 0
)

set /p SYNCPID=<"%PIDFILE%"
powershell.exe -NoProfile -Command "Stop-Process -Id %SYNCPID% -Force -ErrorAction SilentlyContinue"
del "%PIDFILE%" 2>nul
echo Synchronisation arretee.
pause

