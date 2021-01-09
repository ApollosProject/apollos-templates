# create .env file
if test -f .env; then
	echo ".env file already exists!"
	exit 1
fi
echo "APP_DATA_URL=http://localhost:4000
GOOGLE_MAPS_API_KEY=" >.env
