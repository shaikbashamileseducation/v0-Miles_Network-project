#!/bin/bash

# Build script for Miles Network Monitor
# This script builds the application for all supported platforms

# Set colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=======================================================${NC}"
echo -e "${CYAN}    Miles Network Monitor Build Script                 ${NC}"
echo -e "${CYAN}=======================================================${NC}"
echo ""

# Check for required tools
echo -e "${YELLOW}Checking for required tools...${NC}"
for cmd in node npm git; do
  if ! command -v $cmd &> /dev/null; then
    echo -e "${RED}$cmd is required but not installed.${NC}"
    exit 1
  fi
done
echo -e "${GREEN}All required tools are installed.${NC}"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)
if [ $NODE_MAJOR -lt 18 ]; then
  echo -e "${RED}Node.js 18+ is required. You have v$NODE_VERSION.${NC}"
  exit 1
fi
echo -e "${GREEN}Node.js version v$NODE_VERSION is compatible.${NC}"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}Dependencies installed successfully.${NC}"

# Build Next.js application
echo -e "${YELLOW}Building Next.js application...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Next.js build failed.${NC}"
  exit 1
fi
echo -e "${GREEN}Next.js build completed successfully.${NC}"

# Create output directory
echo -e "${YELLOW}Creating output directory...${NC}"
mkdir -p dist
echo -e "${GREEN}Output directory created.${NC}"

# Build for Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
  echo -e "${YELLOW}Building for Windows...${NC}"
  npm run electron:make:win
  if [ $? -ne 0 ]; then
    echo -e "${RED}Windows build failed.${NC}"
  else
    echo -e "${GREEN}Windows build completed successfully.${NC}"
    cp electron/out/make/squirrel.windows/x64/*.exe dist/
  fi
fi

# Build for macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo -e "${YELLOW}Building for macOS...${NC}"
  npm run electron:make:mac
  if [ $? -ne 0 ]; then
    echo -e "${RED}macOS build failed.${NC}"
  else
    echo -e "${GREEN}macOS build completed successfully.${NC}"
    cp electron/out/make/*.dmg dist/
  fi
fi

# Build for Linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  echo -e "${YELLOW}Building for Linux...${NC}"
  npm run electron:make:linux
  if [ $? -ne 0 ]; then
    echo -e "${RED}Linux build failed.${NC}"
  else
    echo -e "${GREEN}Linux build completed successfully.${NC}"
    cp electron/out/make/rpm/x64/*.rpm dist/
    cp electron/out/make/deb/x64/*.deb dist/
  fi
fi

echo -e "${CYAN}=======================================================${NC}"
echo -e "${CYAN}    Build Complete                                     ${NC}"
echo -e "${CYAN}=======================================================${NC}"
echo ""
echo -e "${GREEN}The application has been built successfully.${NC}"
echo -e "${YELLOW}Installers can be found in the 'dist' directory.${NC}"
echo ""
