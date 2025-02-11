#!/bin/bash

metode=$1

if [ "$metode" = "fix" ];then
 npx prettier --config .prettierrc.json --write .
fi

if [ "$metode" = "s" ];then
 echo "Run Localhost"
 npm run start -- --port 10010
fi

if [ "$metode" = "cloud" ];then
 echo "Run Cloud"
 npm update
 npm run start -- --env prod
fi

if [ "$metode" = "teslocal" ];then
 echo "Run Tes Local"
 npm run start -- --env dev
fi

if [ "$metode" = "reg" ];then
 npm run start -- --env dev --reg true
fi

if [ "$metode" = "gen_ts" ];then
 echo "Gen TS proto for GS"
 protoc --plugin=protoc-gen-ts_proto=$(PWD)/node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=. --ts_proto_opt=useOptionals=all src/game/genshin/proto/schema.proto
 echo "Gen TS proto for SR"
 protoc --plugin=protoc-gen-ts_proto=$(PWD)/node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=. --ts_proto_opt=useOptionals=all src/game/starrails/proto/schema.proto

fi

if [ "$metode" = "clean" ];then
 echo "Clean node_module"
 rm -rf node_modules && npm install
fi

if [ "$metode" = "fix" ];then
 #cd src
 npx prettier --config .prettierrc.json --write .
 #cd ..
fi