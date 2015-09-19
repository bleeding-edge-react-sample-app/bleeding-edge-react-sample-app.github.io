import Reflux from 'reflux-core';
import api from './api/api';

export const Users = {
  get: Reflux.createAction({asyncResult: true}),
  getComments: Reflux.createAction({asyncResult: true}),
}
export const Feeds = {
  get: Reflux.createAction({asyncResult: true})
}
export const State = Reflux.createActions([
  'changeBoard',
  'setEditing',
  'clearEditing',
  'endEditing',
]);

Feeds.get.listen(({board, type}) => {
  api.get('r/' + board + '/' + type)
  .then((data) => {
    var results = data.map(({data}) => ({
      id: data.id,
      url: data.url,
      title: data.title,
      author: data.author,
      text: data.selftext,
      board: data.subreddit,
      createdAt: data.created_utc * 1000,
      image: data.image,
    }));
    return {results, type, board};
  })
  .then(Feeds.get.completed, Feeds.get.failed);
});

Users.get.listen((id) => {
  api.get(`user/${id}/about`).then((res) => {
    Users.get.completed(res.data);
  }, Users.get.failed);
});

Users.getComments.listen((user) => {
  api.get(`user/${user}/comments`).then((res) => {
    Users.getComments.completed({user: user, comments: res.map((x) => x.data)});
  }, Users.getComments.failed);
});

State.changeBoard.listen(({type, name}) => {
  document.title = `${name} | EdgeBoard`;

  if (type === 'board') {
    Feeds.get({board: name, type: 'hot'});
  }
})
