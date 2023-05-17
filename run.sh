#!/bin/bash

metode=$1

if [ "$metode" = "fix" ];then
 npx prettier --config .prettierrc.json --write .
fi

if [ "$metode" = "b" ];then
 docker build -t "siakbary/yuukibot:latest" --progress=plain .;
fi

if [ "$metode" = "s" ];then
 echo "Run Localhost"
 npm run start -- --port 10010
fi

if [ "$metode" = "reg" ];then
 npm run reg
fi

if [ "$metode" = "t" ];then
 echo "Run Docker"
 docker run --rm -it -v //e/DOC/Akbar/Work/site/Yuuki-Bot/src/config.json:/app/src/config.json siakbary/yuukibot:latest
fi

# Push Private
if [ "$metode" = "private_push" ];then
 docker push repo.yuuki.me/yuukibot:latest
fi

# Push Public
if [ "$metode" = "push" ];then
 docker push siakbary/yuukibot:latest
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