#!/bin/bash

# Miles Network Monitor Installation Script for Red Hat Linux
# This script installs the Miles Network Monitor on Red Hat Enterprise Linux 8/9

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

# Set colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=======================================================${NC}"
echo -e "${CYAN}    Miles Network Monitor Installation Script          ${NC}"
echo -e "${CYAN}    For Red Hat Enterprise Linux 8/9                   ${NC}"
echo -e "${CYAN}=======================================================${NC}"
echo ""

# Check RHEL version
if [ -f /etc/redhat-release ]; then
  RHEL_VERSION=$(cat /etc/redhat-release | grep -oE '[0-9]+\.[0-9]+' | cut -d. -f1)
  echo -e "${GREEN}Detected Red Hat Enterprise Linux ${RHEL_VERSION}${NC}"
  
  if [ "$RHEL_VERSION" -lt 8 ]; then
    echo -e "${RED}This script requires Red Hat Enterprise Linux 8 or higher${NC}"
    exit 1
  fi
else
  echo -e "${RED}This script is designed for Red Hat Enterprise Linux only${NC}"
  exit 1
fi

# Check for required utilities
echo -e "${YELLOW}Checking for required utilities...${NC}"
for cmd in curl wget tar dnf systemctl firewall-cmd; do
  if ! command -v $cmd &> /dev/null; then
    echo -e "${RED}$cmd is required but not installed. Installing...${NC}"
    dnf install -y $cmd
  fi
done
echo -e "${GREEN}All required utilities are installed.${NC}"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
dnf install -y docker docker-compose nodejs texlive-full podman firewalld selinux-policy
echo -e "${GREEN}Dependencies installed successfully.${NC}"

# Enable and start services
echo -e "${YELLOW}Enabling and starting services...${NC}"
systemctl enable docker
systemctl start docker
systemctl enable firewalld
systemctl start firewalld
echo -e "${GREEN}Services enabled and started successfully.${NC}"

# Create installation directory
echo -e "${YELLOW}Creating installation directory...${NC}"
mkdir -p /opt/miles_monitor
echo -e "${GREEN}Installation directory created at /opt/miles_monitor${NC}"

# Download Miles Monitor files
echo -e "${YELLOW}Downloading Miles Network Monitor files...${NC}"
# In a real scenario, this would download from a server or extract from the package
# For this example, we'll create placeholder files
mkdir -p /opt/miles_monitor/uploads
mkdir -p /opt/miles_monitor/data
mkdir -p /var/lib/miles
mkdir -p /var/log/miles

# Download logo
echo -e "${YELLOW}Downloading Miles Education logo...${NC}"
curl -s -o /opt/miles_monitor/uploads/miles_logo.png https://www.mileseducation.com/images/logo.png
echo -e "${GREEN}Logo downloaded successfully.${NC}"

# Create docker-compose.yml
echo -e "${YELLOW}Creating docker-compose configuration...${NC}"
cat > /opt/miles_monitor/docker-compose.yml << 'EOF'
version: '3.8'

services:
  webapp:
    image: miles/network-monitor:latest
    container_name: miles-webapp
    ports:
      - "${WEBAPP_PORT}:5000"
    environment:
      - NTOPNG_PORT=${NTOPNG_PORT}
      - PRTG_PORT=${PRTG_PORT}
      - UNIFI_PORT=${UNIFI_PORT}
      - INFLUXDB_PORT=${INFLUXDB_PORT}
      - GRAFANA_PORT=${GRAFANA_PORT}
      - ELASTICSEARCH_PORT=${ELASTICSEARCH_PORT}
      - MONGODB_PORT=${MONGODB_PORT}
      - KEYCLOAK_PORT=${KEYCLOAK_PORT}
      - PRTG_LICENSE_KEY=${PRTG_LICENSE_KEY}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - COMPANY_NAME=${COMPANY_NAME}
      - COMPANY_LOGO=${COMPANY_LOGO}
    volumes:
      - /var/lib/miles/webapp:/data
      - /opt/miles_monitor/uploads:/app/uploads
    depends_on:
      - mongodb
      - influxdb
      - elasticsearch
      - keycloak
    restart: always
    networks:
      - miles_net

  ntopng:
    image: ntop/ntopng:5.6
    container_name: miles-ntopng
    ports:
      - "${NTOPNG_PORT}:3000"
    environment:
      - REDIS_HOST=redis
    volumes:
      - /var/lib/miles/ntopng:/var/lib/ntopng
    depends_on:
      - redis
    restart: always
    networks:
      - miles_net

  influxdb:
    image: influxdb:2.7.1
    container_name: miles-influxdb
    ports:
      - "${INFLUXDB_PORT}:8086"
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=admin
      - DOCKER_INFLUXDB_INIT_PASSWORD=${INFLUXDB_PASSWORD}
      - DOCKER_INFLUXDB_INIT_ORG=miles
      - DOCKER_INFLUXDB_INIT_BUCKET=miles_network
      - DOCKER_INFLUXDB_INIT_RETENTION=30d
    volumes:
      - /var/lib/miles/influxdb:/var/lib/influxdb2
    restart: always
    networks:
      - miles_net

  grafana:
    image: grafana/grafana:10.2.0
    container_name: miles-grafana
    ports:
      - "${GRAFANA_PORT}:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - /var/lib/miles/grafana:/var/lib/grafana
    restart: always
    networks:
      - miles_net

  elasticsearch:
    image: elasticsearch:8.8.0
    container_name: miles-elasticsearch
    ports:
      - "${ELASTICSEARCH_PORT}:9200"
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - /var/lib/miles/elasticsearch:/usr/share/elasticsearch/data
    restart: always
    networks:
      - miles_net

  mongodb:
    image: mongo:5.0.22
    container_name: miles-mongodb
    ports:
      - "${MONGODB_PORT}:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=${MONGODB_PASSWORD}
    volumes:
      - /var/lib/miles/mongodb:/data/db
    restart: always
    networks:
      - miles_net

  redis:
    image: redis:7.2
    container_name: miles-redis
    restart: always
    networks:
      - miles_net

  keycloak:
    image: quay.io/keycloak/keycloak:21.1.2
    container_name: miles-keycloak
    ports:
      - "${KEYCLOAK_PORT}:8080"
    environment:
      - KEYCLOAK_ADMIN=admin
      - KEYCLOAK_ADMIN_PASSWORD=${KEYCLOAK_PASSWORD}
      - KC_DB=postgres
      - KC_DB_URL=jdbc:postgresql://postgres:5432/keycloak
      - KC_DB_USERNAME=keycloak
      - KC_DB_PASSWORD=${KEYCLOAK_PASSWORD}
    command: start-dev
    depends_on:
      - postgres
    restart: always
    networks:
      - miles_net

  postgres:
    image: postgres:15
    container_name: miles-postgres
    environment:
      - POSTGRES_DB=keycloak
      - POSTGRES_USER=keycloak
      - POSTGRES_PASSWORD=${KEYCLOAK_PASSWORD}
    volumes:
      - /var/lib/miles/postgres:/var/lib/postgresql/data
    restart: always
    networks:
      - miles_net

networks:
  miles_net:
    driver: bridge
EOF
echo -e "${GREEN}Docker Compose configuration created.${NC}"

# Create environment file
echo -e "${YELLOW}Setting up environment variables...${NC}"
echo -e "${CYAN}Please provide the following information:${NC}"

read -p "Enter SMTP host (default: smtp.gmail.com): " SMTP_HOST
SMTP_HOST=${SMTP_HOST:-smtp.gmail.com}

read -p "Enter SMTP port (default: 587): " SMTP_PORT
SMTP_PORT=${SMTP_PORT:-587}

read -p "Enter SMTP user: " SMTP_USER

read -sp "Enter SMTP password: " SMTP_PASS
echo ""

read -p "Enter PRTG license key (leave blank for trial): " PRTG_LICENSE_KEY

read -p "Enter web app port (default: 5000): " WEBAPP_PORT
WEBAPP_PORT=${WEBAPP_PORT:-5000}

read -p "Enter Grafana port (default: 3001): " GRAFANA_PORT
GRAFANA_PORT=${GRAFANA_PORT:-3001}

# Create .env file
cat > /opt/miles_monitor/.env << EOF
NTOPNG_PORT=3000
PRTG_PORT=8080
UNIFI_PORT=8443
INFLUXDB_PORT=8086
GRAFANA_PORT=$GRAFANA_PORT
ELASTICSEARCH_PORT=9200
MONGODB_PORT=27017
KEYCLOAK_PORT=8081
WEBAPP_PORT=$WEBAPP_PORT
PRTG_LICENSE_KEY=$PRTG_LICENSE_KEY
INFLUXDB_PASSWORD=miles_secure_123
GRAFANA_PASSWORD=miles_secure_123
MONGODB_PASSWORD=miles_secure_123
KEYCLOAK_PASSWORD=miles_secure_123
SMTP_HOST=$SMTP_HOST
SMTP_PORT=$SMTP_PORT
SMTP_USER=$SMTP_USER
SMTP_PASS=$SMTP_PASS
COMPANY_NAME=Miles Education Private Limited
COMPANY_LOGO=/uploads/miles_logo.png
EOF
echo -e "${GREEN}Environment file created.${NC}"

# Configure firewall
echo -e "${YELLOW}Configuring firewall...${NC}"
firewall-cmd --add-port=$WEBAPP_PORT/tcp --permanent
firewall-cmd --add-port=3000/tcp --permanent
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --add-port=8443/tcp --permanent
firewall-cmd --add-port=$GRAFANA_PORT/tcp --permanent
firewall-cmd --add-port=9200/tcp --permanent
firewall-cmd --add-port=27017/tcp --permanent
firewall-cmd --add-port=8081/tcp --permanent
firewall-cmd --reload
echo -e "${GREEN}Firewall configured.${NC}"

# Configure SELinux
echo -e "${YELLOW}Configuring SELinux...${NC}"
semanage fcontext -a -t container_file_t "/var/lib/miles(/.*)?"
restorecon -R /var/lib/miles
echo -e "${GREEN}SELinux configured.${NC}"

# Create systemd service
echo -e "${YELLOW}Creating systemd service...${NC}"
cat > /etc/systemd/system/miles-monitor.service << 'EOF'
[Unit]
Description=Miles Network Monitoring Tool
After=network.target docker.service
Requires=docker.service

[Service]
ExecStart=/usr/bin/docker-compose -f /opt/miles_monitor/docker-compose.yml up
ExecStop=/usr/bin/docker-compose -f /opt/miles_monitor/docker-compose.yml down
Restart=always
WorkingDirectory=/opt/miles_monitor

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable miles-monitor.service
echo -e "${GREEN}Systemd service created and enabled.${NC}"

# Create executable script
echo -e "${YELLOW}Creating executable script...${NC}"
cat > /usr/bin/miles_monitor << 'EOF'
#!/bin/bash

# Miles Network Monitor Control Script

function show_help {
  echo "Miles Network Monitor Control Script"
  echo "Usage: miles_monitor [command]"
  echo ""
  echo "Commands:"
  echo "  start       Start the monitoring service"
  echo "  stop        Stop the monitoring service"
  echo "  restart     Restart the monitoring service"
  echo "  status      Check the status of the monitoring service"
  echo "  logs        Show logs from the monitoring service"
  echo "  backup      Create a backup of the monitoring data"
  echo "  help        Show this help message"
}

case "$1" in
  start)
    echo "Starting Miles Network Monitor..."
    systemctl start miles-monitor.service
    ;;
  stop)
    echo "Stopping Miles Network Monitor..."
    systemctl stop miles-monitor.service
    ;;
  restart)
    echo "Restarting Miles Network Monitor..."
    systemctl restart miles-monitor.service
    ;;
  status)
    systemctl status miles-monitor.service
    ;;
  logs)
    if [ -z "$2" ]; then
      docker-compose -f /opt/miles_monitor/docker-compose.yml logs --tail=100
    else
      docker-compose -f /opt/miles_monitor/docker-compose.yml logs --tail=100 "$2"
    fi
    ;;
  backup)
    echo "Creating backup of Miles Network Monitor data..."
    BACKUP_DIR="/opt/miles_monitor/backups"
    BACKUP_FILE="miles_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
    
    mkdir -p $BACKUP_DIR
    tar -czf "$BACKUP_DIR/$BACKUP_FILE" -C /var/lib/miles .
    
    echo "Backup created: $BACKUP_DIR/$BACKUP_FILE"
    ;;
  help|*)
    show_help
    ;;
esac
EOF

chmod +x /usr/bin/miles_monitor
echo -e "${GREEN}Executable script created at /usr/bin/miles_monitor${NC}"

# Final steps
echo -e "${YELLOW}Starting Miles Network Monitor...${NC}"
systemctl start miles-monitor.service
echo -e "${GREEN}Miles Network Monitor started.${NC}"

# Print success message
echo ""
echo -e "${CYAN}=======================================================${NC}"
echo -e "${CYAN}    Miles Network Monitor Installation Complete        ${NC}"
echo -e "${CYAN}=======================================================${NC}"
echo ""
echo -e "${GREEN}The Miles Network Monitor has been successfully installed.${NC}"
echo -e "${GREEN}You can access the web interface at:${NC}"
echo -e "${CYAN}http://$(hostname -I | awk '{print $1}'):${WEBAPP_PORT}${NC}"
echo ""
echo -e "${YELLOW}To control the service, use the following commands:${NC}"
echo -e "${CYAN}miles_monitor start${NC}    - Start the monitoring service"
echo -e "${CYAN}miles_monitor stop${NC}     - Stop the monitoring service"
echo -e "${CYAN}miles_monitor restart${NC}  - Restart the monitoring service"
echo -e "${CYAN}miles_monitor status${NC}   - Check the status of the monitoring service"
echo -e "${CYAN}miles_monitor logs${NC}     - Show logs from the monitoring service"
echo -e "${CYAN}miles_monitor backup${NC}   - Create a backup of the monitoring data"
echo ""
echo -e "${YELLOW}For more information, run:${NC} ${CYAN}miles_monitor help${NC}"
echo ""
