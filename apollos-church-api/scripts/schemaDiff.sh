#!/usr/bin/env bash
sh ./scripts/generateLocalSchema.sh --start-server
./node_modules/.bin/get-graphql-schema https://apollos-church-api-herokuapp-com.global.ssl.fastly.net > prod.graphql
DIFF=$(graphql-findbreakingchanges prod.graphql local.graphql)
rm prod.graphql
echo "$DIFF"

if [[ ! $DIFF = *"NO BREAKING CHANGES"* ]]
then
  exit 1
else
  exit 0
fi
