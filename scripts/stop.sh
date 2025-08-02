#!/bin/bash
set -e
cd /home/ec2-user/app
docker compose down || true
