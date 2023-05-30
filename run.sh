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

if [ "$metode" = "cloud" ];then
 echo "Run Cloud"
 # TODO: move to ps.yuuki.me
 npm run start -- --port_cloud 443 --port 10010 --host login.yuuki.me --protocol https
fi

if [ "$metode" = "teslocal" ];then
 echo "Run Tes Local"
 npm run start -- --port_cloud 10010 --port 10010 --host 2.0.0.100 --protocol http
fi


if [ "$metode" = "reg" ];then
 npm run start -- --port 10010 --reg true
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

if [ "$metode" = "fix" ];then
 cd src
 npx prettier --config .prettierrc.json --write .
 cd ..
fi