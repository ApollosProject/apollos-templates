#!/bin/bash
if [ $# -ne 2 ]; then
	echo "Usage: secrets.sh -e|-d KEY"
	exit 1
fi

function encrypt() {
	/usr/local/opt/openssl@1.1/bin/openssl enc -aes-256-cbc -pbkdf2 -iter 20000 -in "$1" -out "$1".enc -k "$2"
}

function decrypt() {
	/usr/local/opt/openssl@1.1/bin/openssl enc -d -aes-256-cbc -pbkdf2 -iter 20000 -in "$1".enc -out "$1" -k "$2"
}

SECRETS=(
	"apolloschurchapp/.env.shared"
	"apollos-church-api/.env.shared"
	"apolloschurchapp/android/key.json"
	"apolloschurchapp/android/app/apollos.keystore"
	"apolloschurchapp/ios/apollos.p8"
)

for file in "${SECRETS[@]}"; do
	if [ "$1" = "-e" ]; then
		encrypt "$file" "$2"
	elif [ "$1" = "-d" ]; then
		decrypt "$file" "$2"
	else
		echo "Usage: secrets.sh -e|-d KEY"
		exit 1
	fi
done
