import { Flummox } from 'flummox';

import AppActions from 'actions/AppActions';
import UserActions from 'actions/UserActions';
import ItemsActions from 'actions/ItemsActions';
import CollectionsActions from 'actions/CollectionsActions';
import NotificationsActions from 'actions/NotificationsActions';

import AppStore from 'stores/AppStore';
import UserStore from 'stores/UserStore';
import ItemsStore from 'stores/ItemsStore';
import CollectionsStore from 'stores/CollectionsStore';
import NotificationsStore from 'stores/NotificationsStore';

export default class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('app', AppActions);
    this.createActions('user', UserActions);
    this.createActions('items', ItemsActions);
    this.createActions('collections', CollectionsActions);
    this.createActions('notifications', NotificationsActions);

    this.createStore('app', AppStore, this);
    this.createStore('user', UserStore, this);
    this.createStore('items', ItemsStore, this);
    this.createStore('collections', CollectionsStore, this);
    this.createStore('notifications', NotificationsStore, this);
  }
}
