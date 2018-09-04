import { Store } from 'flummox';

export default class AppStore extends Store {
  constructor(flux) {
    super();

    const appActions = flux.getActions('app');

    this.register(appActions.showSidebar, this.handleShowSidebar);
    this.register(appActions.toggleSidebar, this.handleToggleSidebar);
    this.register(appActions.closeItemsSearch, this.handleCloseItemsSearch);
    this.register(appActions.toggleItemsSearch, this.handleToggleItemsSearch);

    this.register(
      appActions.showCollectionsMobile, this.handleShowCollectionsMobile
    );

    this.register(
      appActions.hideCollectionsMobile, this.handleHideCollectionsMobile
    );

    this.state = {
      isSearchingItems: false,
      sidebarIsVisible: true,
      collectionsVisibleMobile: false
    };
  }

  handleShowSidebar() {
    if (!this.state.sidebarIsVisible) {
      this.setState({ sidebarIsVisible: true });
    }
  }

  handleToggleSidebar() {
    this.setState({ sidebarIsVisible: !this.state.sidebarIsVisible });
  }

  handleCloseItemsSearch() {
    this.setState({ isSearchingItems: false });
  }

  handleToggleItemsSearch() {
    this.setState({ isSearchingItems: !this.state.isSearchingItems });
  }

  handleShowCollectionsMobile() {
    this.setState({ collectionsVisibleMobile: true });
  }

  handleHideCollectionsMobile() {
    this.setState({ collectionsVisibleMobile: false });
  }
}
