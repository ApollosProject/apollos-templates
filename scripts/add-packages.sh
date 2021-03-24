if [ "$#" -ne 1 ]; then
  echo "Usage: ./add-packages.sh <TAG>"
  exit
else
  TAG=$1
fi;

(cd apollos-church-api && NODE_PATH='./node_modules' node ../scripts/add-packages.js $TAG)
(cd apolloschurchapp && NODE_PATH='./node_modules' node ../scripts/add-packages.js $TAG)
