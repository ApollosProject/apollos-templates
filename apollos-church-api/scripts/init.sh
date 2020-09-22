# create .env file
if test -f .env; then
	echo ".env file already exists!"
	exit 1
fi
echo "ROCK_API=
ROCK_TOKEN=" > .env
