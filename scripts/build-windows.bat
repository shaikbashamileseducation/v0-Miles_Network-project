@echo off
echo ========================================================
echo     Miles Network Monitor Build Script for Windows
echo ========================================================
echo.

echo Checking for required tools...
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Node.js is required but not installed.
    exit /b 1
)

where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo npm is required but not installed.
    exit /b 1
)

where git >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo git is required but not installed.
    exit /b 1
)

echo All required tools are installed.

echo Checking Node.js version...
for /f "tokens=1,2,3 delims=." %%a in ('node -v') do (
    set NODE_MAJOR=%%a
)
set NODE_MAJOR=%NODE_MAJOR:~1%
if %NODE_MAJOR% LSS 18 (
    echo Node.js 18+ is required. You have v%NODE_MAJOR%.
    exit /b 1
)
echo Node.js version is compatible.

echo Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo Failed to install dependencies.
    exit /b 1
)
echo Dependencies installed successfully.

echo Building Next.js application...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Next.js build failed.
    exit /b 1
)
echo Next.js build completed successfully.

echo Creating output directory...
if not exist dist mkdir dist
echo Output directory created.

echo Building for Windows...
call npm run electron:make:win
if %ERRORLEVEL% neq 0 (
    echo Windows build failed.
    exit /b 1
)
echo Windows build completed successfully.

echo Copying installer to dist directory...
copy electron\out\make\squirrel.windows\x64\*.exe dist\
echo.

echo ========================================================
echo     Build Complete
echo ========================================================
echo.
echo The application has been built successfully.
echo Installers can be found in the 'dist' directory.
echo.
