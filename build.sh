#!/usr/bin/env bash

npm run build

docker build -t cboisvert/auth-service:latest .

docker push cboisvert/auth-service:latest