#!/bin/bash

if [ -d ".node_modules" ]; then
    rm -rf .node_modules
fi

npm install

if [ -d ".next" ]; then
    rm -rf .next
fi

npm run build

if [ -d "/var/www/tva/TamilParserAssetStaticPrefix" ]; then
    sudo -S rm -rf /var/www/tva/TamilParserAssetStaticPrefix/*
else
    sudo -S mkdir /var/www/tva/TamilParserAssetStaticPrefix
fi

sudo -S mkdir /var/www/tva/TamilParserAssetStaticPrefix/_next

sudo -S cp -R .next/* /var/www/tva/TamilParserAssetStaticPrefix/_next
sudo -S cp -R public/* /var/www/tva/TamilParserAssetStaticPrefix/

pm2 start "npm run start" --name TamilParser