#!/bin/bash
# this script will bump versions in the packages using the add-packages.sh scripts
# and then bump the Apollos versions to be used by the upgrade tool

# get latest apps version
VERSION=$(
	curl -s 'https://api.github.com/repos/apollosproject/apollos-apps/tags' |
		python -m json.tool |
		grep '\"name\"' |
		cut -d ':' -f 2 |
		sed 's/&quot;/\"/g' |
		sed -E 's/\"v(.*)\".*/\1/g' |
		sed -n 1p |
		tr -d '[:space:]'
)

PKG=$(npm show @apollosproject/config version)

if [[ "$VERSION" != "$PKG" ]]; then
	echo "Latest Github tag ($VERSION) and NPM version ($PKG) doesn't match"
	exit 1
fi

./scripts/add-packages.sh latest
yarn # this is to update Pods
(cd apollos-church-api && sed -i "" -E "s/\"[0-9].*\"/\"$VERSION\"/g" apollos.json)
(cd apolloschurchapp && sed -i "" -E "s/\"[0-9].*\"/\"$VERSION\"/g" apollos.json)

echo "Bumped Apollos Version to $VERSION"

# stage files and commit
git commit -am "Release $VERSION"
git tag "v$VERSION"
git push
git push --tags
echo "Commited to repo and pushed tag!"
