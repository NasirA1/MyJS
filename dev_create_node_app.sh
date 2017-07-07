#! /bin/bash


if [[ $# -eq 0 ]] ; then
    echo 'Usage: ./dev_create_node_app.sh projectname'
    exit 1
fi


echo 'creating folder structure'
mkdir -p $1
cd $1
mkdir -p src test
touch test/test.js

echo 'initialising node app'
npm init -y

echo 'installing test frameworks'
npm install mocha chai sinon --save-dev

echo 'Update "test" path in package.json'
sed -i 's/"test": "echo \\"Error: no test specified\\" && exit 1"/"test": ".\/node_modules\/.bin\/mocha --reporter spec"/g' package.json

echo 'All done!'
echo 'To run tests:  cd' $1 '&& npm test'


