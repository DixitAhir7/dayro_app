const fs = require('fs');
const path = require('path');

// console.log(path.extname('test'))
// const FILE_CHECK = path.join(__dirname, path.extname(''));
// console.log(FILE_CHECK)

const FILE_NAME = path.extname('_.js').slice(1);

const fileName = path.basename(__filename);


// a function that writes use strict for me in every .js file
function useStrict() {
   fs.appendFile(fileName, 'use strict', (err) => {
      if (err) return;
   })
};

// check every function and vars are camel case or not
function checkCamelCase() {
   
}

module.exports = { useStrict, checkCamelCase };