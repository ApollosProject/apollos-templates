if [ $# -ne 2 ]
then
		echo "Usage: secrets.sh -e|-d KEY"
		exit
fi

if [ "$1" = "-e" ]
then
		/usr/local/opt/openssl@1.1/bin/openssl enc -aes-256-cbc -pbkdf2 -iter 20000 -in apolloschurchapp/.env.shared -out apolloschurch.env.shared.enc -k "$2"
		/usr/local/opt/openssl@1.1/bin/openssl enc -aes-256-cbc -pbkdf2 -iter 20000 -in apollos-church-api/.env.shared -out apolloschurch.env.shared.enc -k "$2"
		/usr/local/opt/openssl@1.1/bin/openssl enc -aes-256-cbc -pbkdf2 -iter 20000 -in apolloschurchapp/android/app/apollos.keystore -out apolloschurchapp/android/app/apollos.keystore.enc -k "$2"
		/usr/local/opt/openssl@1.1/bin/openssl enc -aes-256-cbc -pbkdf2 -iter 20000 -in apolloschurchapp/android/key.json -out apolloschurchapp/android.key.json.enc -k "$2"
elif [ "$1" = "-d" ]
then
		/usr/local/opt/openssl@1.1/bin/openssl enc -d -aes-256-cbc -pbkdf2 -iter 20000 -in apolloschurchapp/.env.shared.enc -out apolloschurch.env.shared -k "$2"
		/usr/local/opt/openssl@1.1/bin/openssl enc -d -aes-256-cbc -pbkdf2 -iter 20000 -in apollos-church-api/.env.shared.enc -out apolloschurch.env.shared -k "$2"
		/usr/local/opt/openssl@1.1/bin/openssl enc -d -aes-256-cbc -pbkdf2 -iter 20000 -in apolloschurchapp/android/app/apollos.keystore.enc -out apolloschurchapp/android/app/apollos.keystore -k "$2"
		/usr/local/opt/openssl@1.1/bin/openssl enc -d -aes-256-cbc -pbkdf2 -iter 20000 -in apolloschurchapp/android/key.json.enc -out apolloschurchapp/android.key.json -k "$2"
else
		echo "Usage: secrets.sh KEY -e|-d"
		exit
fi
