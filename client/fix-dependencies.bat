@echo off
echo Fixing Movie Store dependencies...

echo.
echo 1. Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo 2. Installing dependencies with legacy peer deps...
npm install --legacy-peer-deps

echo.
echo 3. Dependencies fixed! You can now run: npm start
pause