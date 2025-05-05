# Miles Network Monitor

A comprehensive network monitoring tool for Miles Education Private Limited. This standalone application provides real-time monitoring, alerting, and reporting for your network infrastructure.

## Features

- Real-time network monitoring
- Device management
- User management with role-based access control
- Customizable dashboards
- Automated reporting
- Alert notifications
- Security monitoring
- Responsive design for all devices

## System Requirements

- Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+, Red Hat 8+)
- 4GB RAM minimum (8GB recommended)
- 2GB free disk space
- Administrator/root privileges for installation

## Installation

### Windows

1. Download the latest installer from the releases page
2. Run the installer and follow the on-screen instructions
3. Launch the application from the Start menu

### macOS

1. Download the latest DMG file from the releases page
2. Open the DMG file and drag the application to your Applications folder
3. Launch the application from the Applications folder

### Linux (Debian/Ubuntu)

1. Download the latest DEB package from the releases page
2. Install the package using:
   \`\`\`
   sudo dpkg -i miles-network-monitor_1.0.0_amd64.deb
   sudo apt-get install -f
   \`\`\`
3. Launch the application from the applications menu or run:
   \`\`\`
   miles-network-monitor
   \`\`\`

### Linux (Red Hat/CentOS)

1. Download the latest RPM package from the releases page
2. Install the package using:
   \`\`\`
   sudo rpm -i miles-network-monitor-1.0.0-1.x86_64.rpm
   \`\`\`
3. Launch the application from the applications menu or run:
   \`\`\`
   miles-network-monitor
   \`\`\`

## Building from Source

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Build Steps

1. Clone the repository:
   \`\`\`
   git clone https://github.com/miles-education/network-monitor.git
   cd network-monitor
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Build the application:
   \`\`\`
   npm run electron:make
   \`\`\`

   This will create platform-specific packages in the `electron/out/make` directory.

### Platform-Specific Builds

- Windows: `npm run electron:make:win`
- macOS: `npm run electron:make:mac`
- Linux: `npm run electron:make:linux`

## Development

1. Start the Next.js development server:
   \`\`\`
   npm run dev
   \`\`\`

2. In a separate terminal, start the Electron app:
   \`\`\`
   npm run electron
   \`\`\`

## Configuration

On first launch, the application will guide you through a setup wizard to configure:

1. Admin credentials
2. Network settings
3. Monitoring parameters
4. Notification settings
5. Advanced system settings

## Default Login

- Username: `admin`
- Password: `admin`

**Important:** Change the default password after first login.

## License

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

© 2025 Miles Education Private Limited. All rights reserved.
\`\`\`

## 7. Let's create a middleware to handle authentication
