@echo off
title Istiqrar COD - local
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo [خطأ] Node.js غير موجود. ثبّته من https://nodejs.org ثم أعد المحاولة.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo [خطأ] فشل npm install
    pause
    exit /b 1
  )
)

netstat -ano | findstr ":3070 " | findstr LISTENING >nul 2>&1
if not errorlevel 1 (
  echo.
  echo المنفذ 3070 مستعمل — غالباً سيرفر قديم شغال.
  echo سيتم إيقاف العملية على 3070 ثم التشغيل...
  for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3070 " ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
  )
  timeout /t 2 /nobreak >nul
)

echo.
echo Starting desktop app (data stays on this PC)...
echo لا تغلق هذه النافذة — التطبيق يخدم هنا.
echo.
call npm run desktop:dev
set ERR=%ERRORLEVEL%

if not %ERR%==0 (
  echo.
  echo [خطأ] التشغيل توقف (كود %ERR%^).
  echo إذا المنفذ 3070 مشغول: أغلق أي نافذة CMD أخرى أو أعد تشغيل الحاسوب.
  echo.
  pause
  exit /b %ERR%
)

pause
