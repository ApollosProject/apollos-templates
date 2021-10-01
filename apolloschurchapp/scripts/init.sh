# create .env file
if test -f .env; then
	echo ".env file already exists!"
	exit 1
fi

echo "You will need the following before beginning:
Google Maps API Key

Are you ready to proceed? [y/n]: "
read -r ANSWER
if $ANSWER != "y"; then
	exit 1
fi

# config variables
echo "Google Maps API Key: "
read -r GOOGLE

echo "APP_DATA_URL=http://localhost:4000
GOOGLE_MAPS_API_KEY=$GOOGLE" >.env

# remove template encrypted files
rm .env.shared.enc
rm android/key.json.enc
rm android/app/apollos.keystore.enc
rm ios/apollos.p8.enc

# app name
echo "App name: "
read -r APP
echo "Android App ID (ex: com.churchname.apollosapp): "
read -r APP_ID
CLEAN_APP=$(echo "$APP" | tr -d '[:space:]')
npx react-native-rename "$CLEAN_APP" -b "$APP_ID"

sed -i "" -E "s/Apollos Church/$APP/g" apolloschurchapp/ios/Info.plist
sed -i "" -E "s/Apollos Church/$APP/g" apolloschurchapp/android/app/src/main/res/values/strings.xml
