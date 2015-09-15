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
]);

Feeds.get.listen(({board, type}) => {
  api.get('/r/' + board + '/' + type)
  .then((data) => {
    var results = data.map((item) => ({
      id: item.id,
      url: item.url,
      title: item.title,
      author: item.author,
      text: item.selftext,
      board: item.subreddit,
      createdAt: item.created_utc * 1000,
      image: image,
    }));
    return results;
  })
  .then(Feed.get.completed, Feed.get.failed);
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
