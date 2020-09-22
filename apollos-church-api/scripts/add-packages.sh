# get list of apollosproject packages to update

# get devDependencies line number
DEVDEPSLINE=$(grep -n "devDependencies" package.json | sed -E "s/^([0-9]+):.*/\1/g")

# get dependecies line number
DEPSLINE=$(grep -n "dependencies" package.json | sed -E "s/^([0-9]+):.*/\1/g")

# determine what npm tag to update to
if [ "$#" -ne 1 ]; then
	echo "pass npm tag like this: ./add-packages.sh <TAG>"
	exit 1
else
	TAG=$1
fi;

# replace package names with version tag
JSON=$(sed -E "s/^.*\"(@apollosproject\/[a-z\-]+)\".*$/\1@$TAG /g" package.json)

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
