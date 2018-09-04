import React from 'react';

export default class StoreLinkInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { collection: props.collection };
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.collection !== nextProps.collection) {
      this.setState({ collection: nextProps.collection });
    }
  }

  render() {
    return (
      <div className="StoreLinkInput">
        <input
          ref="link"
          type="text"
          autoFocus
          className="StoreLinkInput__input textfield"
          onKeyDown={this.onKeyDown.bind(this)}
          placeholder="http://..."/>
        <button
          type="button"
          onClick={this.openItemWindow.bind(this)}
          className="StoreLinkInput__button button button--primary">
          <span>Store</span>
        </button>
      </div>
    );
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.openItemWindow();
    }
  }

  openItemWindow() {
    const link = React.findDOMNode(this.refs.link).value;

    if (link) {
      this.context.router.transitionTo('create-item', {}, {
        type: 'link',
        directUrl: encodeURIComponent(link),
        sourceUrl: encodeURIComponent(link),
        collection: this.state.collection
      });
    }
  }
}
