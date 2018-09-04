import React from 'react';

export default class CollectionChooser extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};

    if (props.collection) {
      this.state.collection = props.collection;
    } else if (props.collections && props.collections.length) {
      this.state.collection = props.collections[0].objectId;
    }
  }

  static defaultProps = {
    label: 'Choose a Collection',
    showLabel: true,
    onCollectionChange: function() { return; }
  }

  componentWillReceiveProps(nextProps) {
    const { collection } = nextProps;

    if (this.state.collection !== collection) {
      this.setState({ collection });
    }
  }

  render() {
    return (
      <div className="CollectionChooser">
        {this.renderLabel()}

        <label className="select" disabled={!this.props.hasCollections}>
          {this.renderSelect()}
        </label>
      </div>
    );
  }

  renderLabel() {
    const { label, showLabel, isFetchingCollections } = this.props;

    if (showLabel) {
      return isFetchingCollections ? (
        <label className="label">Fetching Collections...</label>
      ) : (
        <label className="label">{label}</label>
      );
    } else {
      return null;
    }
  }

  renderSelect() {
    return (
      <select
        value={this.state.collection}
        required
        disabled={this.props.isDisabled}
        onChange={this.onChange.bind(this)}>
        {this.renderOptions()}
      </select>
    );
  }

  renderOptions() {
    return this.props.collections.map((collection) => {
      return (
        <option
          key={collection.objectId}
          value={collection.objectId}
          className="collections__option">
          {collection.name}
        </option>
      );
    });
  }

  onChange(event) {
    const collection = event.target.value;

    this.setState({ collection }, () => {
      this.props.onCollectionChange(collection);
    });
  }
}
