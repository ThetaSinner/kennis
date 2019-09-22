pushd server

yarn install
yarn run build:prod
yarn run assemble

docker tag kennis-server thetasinner/kennis-sever:1.1
docker tag kennis-server thetasinner/kennis-sever:latest

popd

pushd app

yarn install
yarn run build:prod
yarn run assemble

docker tag kennis-app thetasinner/kennis-app:1.1
docker tag kennis-app thetasinner/kennis-app:latest

popd
