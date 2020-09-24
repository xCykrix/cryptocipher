#!/bin/bash

### SETUP ENVIRONMENT
PWD=$(pwd)

echo "[project:upgrade] Starting Installation and Upgrade of Project . . ."
cd ..
sleep 3

echo "[project:upgrade] do:task/upgrade-yarn"
rm .yarnrc.yml
yarn set version berry
yarn set version latest
sleep 3

echo "[project:upgrade] do:task/package-install"
yarn install
sleep 3

echo "[project:upgrade] do:task/package-upgrade"
yarn up '*'
sleep 3

# Return to Saved Directory
cd "$PWD"

echo "[project:upgrade] Completed Installation and Upgrade of Project . . ."
