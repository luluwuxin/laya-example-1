#! /usr/bin/env bash

java -jar closure-compiler-v20180101.jar --js ./server/CybertronZero.js --js_output_file ./release/CybertronZero.js
java -jar closure-compiler-v20180101.jar --js ./server/Client.js --js_output_file ./release/Client.js
java -jar closure-compiler-v20180101.jar --js ./server/Data.js --js_output_file ./release/Data.js
java -jar closure-compiler-v20180101.jar --js ./server/Helper.js --js_output_file ./release/Helper.js
java -jar closure-compiler-v20180101.jar --js ./server/Server.js --js_output_file ./release/Server.js
java -jar closure-compiler-v20180101.jar --js ./server/Utils.js --js_output_file ./release/Utils.js
