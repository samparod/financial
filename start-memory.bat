@echo off
title Istiqrar COD - RAM server
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo [خطأ] Node.js غير موجود. ثبّته من https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

netstat -ano | findstr ":3070 " | findstr LISTENING >nul 2>&1
if not errorlevel 1 (
  echo تحرير المنفذ 3070...
  for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3070 " ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
  )
  timeout /t 2 /nobreak >nul
)

echo.
echo Server = RAM on this PC. Open: http://localhost:3070
echo لا تغلق هذه النافذة.
echo.
call npm run dev:memory
echo.
pause
