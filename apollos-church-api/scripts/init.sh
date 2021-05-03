# create .env file
if test -f .env; then
	echo ".env file already exists!"
	exit 1
fi

echo "You will need the following before beginning:
Rock URL
Rock API Token

Are you ready to proceed? [y/n]: "
read -r ANSWER
if $ANSWER != "y"; then
	exit 1
fi

echo "Rock URL: "
read -r ROCK_URL
echo "Rock API Token: "
read -r ROCK_TOKEN

echo "ROCK_URL=$ROCK_URL
ROCK_TOKEN=$ROCK_TOKEN" >.env

# remove template encrypted files
rm .env.shared.enc
