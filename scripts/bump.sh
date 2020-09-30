#!/bin/bash
# this script will bump versions in the packages using the add-packages.sh scripts and then bump the Apollos versions

# get latest apps version
VERSION=$(
curl -s 'https://api.github.com/repos/apollosproject/apollos-apps/tags' \
| python -m json.tool \
| grep '\"name\"' \
| cut -d ':' -f 2 \
| sed 's/&quot;/\"/g' \
| sed -E 's/\"v(.*)\".*/\1/g' \
| sed -n 1p
)

if [[ $VERSION == *beta* ]]
then
	TAG=beta
else
	TAG=latest
fi

echo $VERSION

# API
(cd apollos-church-api || exit && yarn "$TAG" && sed -i "" "s/\"([0-9].*)\"/\"$VERSION\"/g" apollos.json)
