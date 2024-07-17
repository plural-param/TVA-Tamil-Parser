#!/bin/bash

echo "plural@123" | sudo -S mkdir /var/www/html/_next
echo "plural@123" | sudo -S cp -R .next/* /var/www/html/_next
echo "plural@123" | sudo -S cp -R public/static /var/www/html
echo "plural@123" | sudo -S cp -R public/conllu /var/www/html
echo "plural@123" | sudo -S cp -R public/guidelines /var/www/html