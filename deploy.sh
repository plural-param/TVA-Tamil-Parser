#!/bin/bash

if [ -d ".node_modules" ]; then
    rm -rf .node_modules
fi

npm install

if [ -d ".next" ]; then
    rm -rf .next
fi

npm run build

if [ -d "/var/www/html/TamilParserAssetStaticPrefix" ]; then
    sudo -S rm -rf /var/www/html/TamilParserAssetStaticPrefix/*
else
    sudo -S mkdir /var/www/html/TamilParserAssetStaticPrefix
fi

sudo -S mkdir /var/www/html/TamilParserAssetStaticPrefix/_next

sudo -S cp -R .next/* /var/www/html/TamilParserAssetStaticPrefix/_next
sudo -S cp -R public/* /var/www/html/TamilParserAssetStaticPrefix/

pm2 start "npm run start" --name TamilParser