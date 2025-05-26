#!/bin/bash

set -e  # Exit on error

echo "Starting deployment at $(date)"

cd ~/app

if [ -d "blackflow" ]; then
  echo "Updating existing blackflow repository..."
  cd blackflow
  
  # Fetch latest changes and check current branch
  git fetch origin
  CURRENT_BRANCH=$(git branch --show-current)
  echo "Current branch: $CURRENT_BRANCH"
  
  # Reset any local changes to avoid conflicts
  git reset --hard HEAD
  
  # Pull latest changes
  if ! git pull origin $CURRENT_BRANCH; then
    echo "ERROR: Failed to pull latest changes"
    exit 1
  fi
  
  echo "Successfully pulled latest changes"
  git log --oneline -5
else
  echo "Cloning blackflow repository..."
  git clone https://github.com/samif0/blackflow.git blackflow
  cd blackflow
fi

# Copy docker-compose files
cp docker-compose.yml ../ || echo "No docker-compose.yml to copy"

cd ..

# Move production files
if [ -f "~/docker-compose.prod.yml" ]; then
  mv ~/docker-compose.prod.yml ./
else
  echo "Using docker-compose.prod.yml from blackflow directory"
  cp blackflow/docker-compose.prod.yml ./ || echo "Warning: No docker-compose.prod.yml found"
fi

if [ -d "~/nginx" ]; then
  mv ~/nginx ./
else
  echo "Using nginx directory from blackflow"
  cp -r blackflow/nginx ./ || echo "Warning: No nginx directory found"
fi

# Create merged docker-compose file
echo "Creating docker-compose.merged.yml..."
if [ -f "blackflow/scripts/deploy/create-docker-compose.sh" ]; then
  ./blackflow/scripts/deploy/create-docker-compose.sh
else
  echo "Warning: create-docker-compose.sh not found, using base docker-compose.yml"
  cp docker-compose.yml docker-compose.merged.yml
fi

# Ensure SSL directory exists
mkdir -p ./nginx/ssl

# Copy SSL certificates from Let's Encrypt to the nginx ssl directory
if [ -d "/etc/letsencrypt/live/blackflowlabs.com" ]; then
  echo "Copying SSL certificates for blackflowlabs.com"
  sudo cp /etc/letsencrypt/live/blackflowlabs.com/fullchain.pem ./nginx/ssl/cert.pem
  sudo cp /etc/letsencrypt/live/blackflowlabs.com/privkey.pem ./nginx/ssl/key.pem
  sudo chown $USER:$USER ./nginx/ssl/*.pem
  sudo chmod 600 ./nginx/ssl/*.pem
else
  echo "Warning: SSL certificates for blackflowlabs.com not found"
fi

# Run cleanup script
if [ -f "./blackflow/scripts/cleanup/cleanup-docker.sh" ]; then
  echo "Running Docker cleanup..."
  ./blackflow/scripts/cleanup/cleanup-docker.sh
else
  echo "Warning: cleanup-docker.sh not found, skipping cleanup"
fi

# Build and deploy with Docker Compose
echo "Building and starting containers..."
if [ -f "docker-compose.merged.yml" ] && [ -f "docker-compose.prod.yml" ]; then
  docker-compose -f docker-compose.merged.yml -f docker-compose.prod.yml up -d --build
else
  echo "ERROR: Required docker-compose files not found"
  exit 1
fi

# Verify deployment
echo "Verifying deployment..."
docker ps

# Clean up old images
docker image prune -af --force

echo "Deployment completed at $(date)"
echo "Latest commit deployed:"
cd blackflow && git log --oneline -1
