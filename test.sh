#!/usr/bin/env bash
docker build -t website-test .
docker run -dp 8080:80 --name dev-server website-test
