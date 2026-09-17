@echo off
title Istiqrar COD - RAM server (this PC)
cd /d "%~dp0"
if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)
echo.
echo Server = RAM on this PC. API: http://localhost:3070/api/state
echo Snapshot file: data\memory-snapshot.json
echo.
call npm run dev:memory
