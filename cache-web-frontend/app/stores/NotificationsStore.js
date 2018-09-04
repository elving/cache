import { Store } from 'flummox';

export default class NotificationsStore extends Store {
  constructor(flux) {
    super();

    const notificationsActions = flux.getActions('notifications');

    this.register(notificationsActions.close, this.handleClose);
    this.register(notificationsActions.notify, this.handleNotify);

    this.state = {
      type: '',
      message: '',
      position: 'topRight',
      isActive: false
    };
  }

  handleNotify(notification) {
    const { type, message, position } = notification;

    this.setState({
      type, message,
      position: position || 'topRight',
      isActive: true
    });

    setTimeout(() => {
      this.handleClose();
    }, 3000);
  }

  handleClose() {
    this.setState({
      type: '',
      message: '',
      position: 'topRight',
      isActive: false
    });
  }
}
