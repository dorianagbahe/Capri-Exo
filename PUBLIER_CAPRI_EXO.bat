@echo off
title Publier Capri Exo
set /p message=Description de la modification : 
if "%message%"=="" set "message=Mise a jour du site Capri Exo"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0outils\publier-github.ps1" -Message "%message%"
pause
