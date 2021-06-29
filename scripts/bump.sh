#!/bin/bash
# this script will bump versions in the packages using the add-packages.sh scripts
# and then bump the Apollos versions to be used by the upgrade tool

# On github, we need use the github token
# Otherwise we run into rate limits since all MacOS images share the same IP
if [ -z ${GITHUB_TOKEN+x} ]; then
	TAGS=$(curl https://api.github.com/repos/apollosproject/apollos-apps/tags);
else
	TAGS=$(curl https://api.github.com/repos/apollosproject/apollos-apps/tags -H"Authorization: Bearer ${GITHUB_TOKEN}");
fi

# get latest apps version
VERSION=$(
	echo $TAGS |
			python -c "import sys, json; print json.load(sys.stdin)[0]['name'][1:]"
)

echo $VERSION

PKG=$(npm show @apollosproject/config version)

if [[ "$VERSION" != "$PKG" ]]; then
	echo "Latest Github tag ($VERSION) and NPM version ($PKG) doesn't match"
	exit 1
fi

./scripts/add-packages.sh latest
yarn                                  # this is to update yarn.lock and Pods
(cd apolloschurchapp && yarn test -u) # this is update snaps
(cd apollos-church-api && sed -i "" -E "s/\"[0-9].*\"/\"$VERSION\"/g" apollos.json)
(cd apolloschurchapp && sed -i "" -E "s/\"[0-9].*\"/\"$VERSION\"/g" apollos.json)

echo "Bumped Apollos Version to $VERSION"

# stage files and commit
git commit -am "Release $VERSION"
git tag "v$VERSION"
git push
git push --tags
echo "Commited to repo and pushed tag!"
