#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');

var fileName = 'rt' || 'uiautomator';
var data = fs.readFileSync(path.join(__dirname, '..', 'data', `${fileName}.data`), 'utf8');

data = data.trim().split('\n');

var arr = [];

data.forEach(function(item) {
  var temp = item.split('/');
  var name = temp[temp.length - 1];
  temp.pop();
  var parent = temp.join('.');

  arr.push({
    id: name,
    name: name,
    parent: parent
  });
});

var groupByParents = function(array) {
  var parents = {};

  array.forEach(function(item) {
    var parentID = item['parent'] || '0';

    if (parentID && Object.hasOwnProperty.call(parents, parentID)) {
      parents[parentID].push(item);
      return;
    }

    parents[parentID] = [item];
  });

  return parents;
};

var data = arr.slice();
var grouped = groupByParents(data);

var root = {
  id: 'Object',
  name: 'Object',
  parent: null,
  children: []
};

for (var item in grouped) {
  root['children'].push({
    id: item,
    name: item,
    parent: 'Object',
    children: grouped[item]
  });
}

fs.writeFileSync(path.join(__dirname, '..', 'data', `${fileName}.json`), JSON.stringify(root));

console.log('build success!');
