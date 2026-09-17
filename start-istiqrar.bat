@echo off
title Istiqrar COD - local
cd /d "%~dp0"
if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)
echo Starting desktop app (data stays on this PC)...
call npm run desktop:dev
