# this script will bump versions in the packages using the add-packages.sh scripts and then bump the Apollos versions
TAG=$1
if $TAG != "latest" || $TAG != "beta" || $TAG != "canary"
then
	echo "Usage: bump.sh latest|beta|canary"
	exit
fi
VERSION="1.6.0-beta.2" # get version from apps tag that matches TAG

# API
(cd apollos-church-api || exit && yarn "$TAG" && sed -i "" "s/\"([0-9].*)\"/$VERSION/g" apollos.json)
