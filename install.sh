#!/bin/bash
set -e

echo "chirimen-server-for-raspberry-pi re-install"
echo ""

echo "remove node_modules, pnpm-lock.yaml"
rm -rf node_modules ppnpm-lock.yaml

echo ""
echo "npm cache verify"
npm cache verify

echo ""
echo "pnpm i --force"
pnpm i --force
