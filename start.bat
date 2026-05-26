@echo off
echo =========================================================
echo  Iniciando Servidor Local para la Landing Sostener-nos...
echo =========================================================
echo.
echo  Abriendo el navegador en http://localhost:3000
echo.
start http://localhost:3000
python -m http.server 3000
pause
