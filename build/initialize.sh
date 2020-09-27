#!/bin/bash

### SETUP ENVIRONMENT
PWD=$(pwd)

echo "[project:initialize] Starting Initialization of Project . . ."
cd ..
sleep 3

echo "[project:initialize] do:task/setup-sdk"
yarn dlx @yarnpkg/pnpify --sdk vscode
sleep 3

echo "[project:initialize] do:task/upgrade"
yarn upgrade
sleep 3

echo "[project:initialize] Completed Initialization of Project . . ."
cd "$PWD"
sleep 3
