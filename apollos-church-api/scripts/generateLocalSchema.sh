PING_SERVER="curl 'http://localhost:4000/graphql' -H 'content-type: application/json' -H 'accept: application/json' --data-binary '{\"query\":\"{_placeholder}\"}' > /dev/null 2>&1"

if eval "$PING_SERVER"; then
  echo 'Server running, downloading schema from localhost:4000'
  ./node_modules/.bin/get-graphql-schema http://localhost:4000 > local.graphql
  echo 'Done. Check local.graphql'
else
  sleep 1
  until eval "$PING_SERVER"; do
      sleep 1
      echo 'Waiting for server to boot....'
  done
  echo 'Curling Server for most recent schema.'
  ./node_modules/.bin/get-graphql-schema http://localhost:4000 > local.graphql
fi
