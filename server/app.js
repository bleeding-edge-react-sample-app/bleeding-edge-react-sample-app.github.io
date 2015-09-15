import express, {Router} from 'express';
import {promisifyAll} from 'bluebird';
const fs = promisifyAll(require('fs'));

var router = module.exports = Router();

var CACHE = {
  hot: {},
  users: {},
  byId: {},
  allItems: [],
};
loadData();

router.get('/hot/:name', (req, res) => {
  console.log(CACHE);
  var data = CACHE.hot[req.params.name];
  if (data) {
    res.send(data);
  }
  else {
    res.status(404).send();
  }
});

router.get('/user/:name', (req, res) => {
  var data = CACHE.users[req.params.name];
  if (data) {
    res.send(data);
  }
  else {
    res.status(404).send();
  }
});

router.get('/item/:id', (req, res) => {
  var data = CACHE.byId[req.params.id];
  if (data) {
    res.send(data);
  }
  else {
    res.status(404).send();
  }
});



async function loadData(){
  var fixtureFiles = await fs.readdirAsync('fixtures');
  var boards = await* fixtureFiles
    .map((fileName) => {
      return fs.readFileAsync(`fixtures/${fileName}`, 'utf8')
      .then((content) => {
        var boardName = fileName.split('-').pop().split('.').shift();
        return {name: boardName, data: JSON.parse(content)};
      })
    });

  CACHE.allItems = [];
  boards.forEach(({name, data}) => {
    CACHE.hot[name] = data;
    data.forEach((item) => CACHE.allItems.push(item));
  });
  indexData();
}

function indexData(){
  CACHE.users = {};
  CACHE.byId = {};

  // build indexes
  CACHE.allItems.forEach((item) => {
    CACHE.byId[item.id] = item;
    if (!CACHE.users[item.author]) {
      CACHE.users[item.author] = [];
    }
    CACHE.users[item.author].push(item);
  });

  // sort items by created at
  const byCreated = (a, b) => b.createdAt - a.createdAt;
  CACHE.allItems.sort(byCreated);
  Object.keys(CACHE.users, (author) => {
    CACHE.users[author].sort(byCreated);
  });
}
