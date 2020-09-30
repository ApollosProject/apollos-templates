# get list of apollosproject packages to update
function add() {
	# get devDependencies line number
	DEVDEPSLINE=$(grep -n "devDependencies" package.json | sed -E "s/^([0-9]+):.*/\1/g")

	# get dependecies line number
	DEPSLINE=$(grep -n "dependencies" package.json | sed -E "s/^([0-9]+):.*/\1/g")

	# replace package names with version tag
	JSON=$(sed -E "s/^.*\"(@apollosproject\/[a-z\-]+)\".*/\1@$1 /g" package.json)

	# remove packages with no tags
	JSON=$( echo "$JSON" | sed "s/@apollosproject\/react-native-airplay-btn.*//g")

	# if packages are listed first and dev packages second...
	if [ $DEVDEPSLINE -gt $DEPSLINE ]
	then
			PKGS=$(echo "$JSON" | sed -n "$DEPSLINE","$DEVDEPSLINE"p | grep "@apollosproject" | tr -d "\n")
			DEVPKGS=$(echo "$JSON" | sed -n "$DEVDEPSLINE",/^$/p | grep "@apollosproject" | tr -d "\n")
	else
			PKGS=$(echo "$JSON" | sed -n "$DEPSLINE",/^$/p | grep "@apollosproject" | tr -d "\n")
			DEVPKGS=$(echo "$JSON" | sed -n "$DEVDEPSLINE","$DEPSLINE"p | grep "@apollosproject" | tr -d "\n")
	fi

	yarn add --dev $DEVPKGS --ignore-scripts
	yarn add $PKGS --ignore-scripts
}

# determine what npm tag to update to
if [ "$#" -ne 1 ]; then
	echo "Usage: ./add-packages.sh <TAG>"
	exit
else
	TAG=$1
fi;

(cd apollos-church-api && add $TAG)
(cd apolloschurchapp && add $TAG)
