import Reflux from 'reflux-core';
import api from './api/api';

export const Users = {
  get: Reflux.createAction({
    asyncResult: true
  })
}

export const State = Reflux.createActions([
  'changeBoard',
]);

Users.get.listen((id) => {
  api.get(`user/${id}`).then(Users.get.completed, Users.get.failed);
});
