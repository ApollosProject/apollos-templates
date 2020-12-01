#!/bin/bash
# this script will bump versions in the packages using the add-packages.sh scripts and then bump the Apollos versions

# insure working directory is clean first
if [[ $(git diff --stat) != '' ]]; then
	echo 'Working directory not clean!'
	exit
fi

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

if [[ "$VERSION" == *beta* ]]; then
	TAG=beta
	PKG=$(npm show @apollosproject/config@beta version)
else
	TAG=latest
	PKG=$(npm show @apollosproject/config version)
fi

if [[ "$VERSION" != "$PKG" ]]; then
	echo "Latest Github tag ($VERSION) and NPM version ($PKG) doesn't match"
	exit 1
fi

./scripts/add-packages.sh $TAG
(cd apollos-church-api && sed -i "" -E "s/\"[0-9].*\"/\"$VERSION\"/g" apollos.json)
(cd apolloschurchapp && sed -i "" -E "s/\"[0-9].*\"/\"$VERSION\"/g" apollos.json)

echo "Bumped Apollos Version to $VERSION"

# stage files and commit
git commit -am "Release $VERSION"
git tag "v$VERSION"
git push
git push --tags
echo "Commited to repo and pushed tag!"
