#!/bin/bash

if [ ! -e server.ts ]
then
	echo "Error: could not find main application server.js file"
	echo "You should run the generate-ssl-certs.sh script from the main MEAN application root directory"
	echo "i.e: bash scripts/generate-ssl-certs.sh"
	exit -1
fi

echo "Generating self-signed certificates..."
mkdir -p ./server/lib/config/sslcerts
openssl genrsa -out ./server/lib/config/sslcerts/key.pem 4096
openssl req -new -key ./server/lib/config/sslcerts/key.pem -out ./server/lib/config/sslcerts/csr.pem
openssl x509 -req -days 1186 -in ./server/lib/config/sslcerts/csr.pem -signkey ./server/lib/config/sslcerts/key.pem -out ./server/lib/config/sslcerts/cert.pem
rm ./server/lib/config/sslcerts/csr.pem
chmod 600 ./server/lib/config/sslcerts/key.pem ./server/lib/config/sslcerts/cert.pem
