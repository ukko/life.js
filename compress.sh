#!/bin/sh
rm www/js/app/all.min.js www/js/app/all.js

cat www/js/app/*.js > www/js/app/all.js
java -jar /www/compiler.jar --charset UTF-8 --js www/js/app/all.js --js_output_file www/js/app/all.min.js
echo "Size difference:"
ls -lh www/js/app/all.*js | awk '{ print $5 "\t" $9 }'
