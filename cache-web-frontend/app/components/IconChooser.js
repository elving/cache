import React from 'react';
import classNames from 'classnames';
import arraySearch from 'lib/arraySearch';
import collectionIcons from 'lib/collectionIcons';

import AppIcon from 'components/AppIcon';
import CollectionIcon from 'components/CollectionIcon';

export default class IconChooser extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: props.selected || 'folder',
      filteredIcons: [],
      iconListIsVisible: false
    };

    this.state.filteredIcons = collectionIcons;
  }

  static defaultProps = {
    onSelect: function() {
      return;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  render() {
    const togglerClasses = classNames({
      'icon-chooser__toggler': true,
      'icon-chooser__toggler--active': this.state.iconListIsVisible
    });

    const listWrapperClasses = classNames({
      'icon-chooser__list-wrapper': true,
      'icon-chooser__list-wrapper--visible': this.state.iconListIsVisible
    });

    return (
      <div className="icon-chooser">
        <button
          type="button"
          onClick={this.toggleIconsList.bind(this)}
          className={togglerClasses}>
          <span>
            {this.renderSelected()}
            <span className="icon-chooser__toggler__icon-wrapper">
              <AppIcon
                name="down"
                size="18px"
                color="#2498F7"
                className="icon-chooser__toggler__icon"
              />
            </span>
          </span>
        </button>
        <div className={listWrapperClasses}>
          <div className="icon-chooser__list-search-wrapper">
            <input
              onChange={this.search.bind(this)}
              autoFocus
              className="icon-chooser__list-search textfield"
              placeholder="Search icons"/>
          </div>
          <ul className="icon-chooser__list list">
            {this.renderIcons()}
          </ul>
          <div className="icon-chooser__footer">
            <button
              type="button"
              onClick={this.toggleIconsList.bind(this)}
              className="button button">
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderSelected() {
    return this.state.selected ? (
      <CollectionIcon name={this.state.selected} size="28px" color="#2c3e50"/>
    ) : null;
  }

  renderIcons() {
    return this.state.filteredIcons.map((name) => {
      const iconClasses = classNames({
        [name]: true,
        'icon-chooser__item': true,
        'icon-chooser__item--selected': name === this.state.selected
      });

      return (
        <li key={`icon-${name}`} className={iconClasses}>
          <button
            type="button"
            onClick={this.select.bind(this)}
            data-icon={name}
            data-action="select-icon">
            <span>
              <CollectionIcon name={name} size="28px" color="#2c3e50"/>
            </span>
          </button>
        </li>
      );
    });
  }

  toggleIconsList() {
    this.setState({ iconListIsVisible: !this.state.iconListIsVisible });
  }

  search(event) {
    const term = event.currentTarget.value;

    this.setState({
      filteredIcons: term ? arraySearch.findString(
        term, collectionIcons
      ) : collectionIcons
    });
  }

  select(event) {
    const selected = event.currentTarget.getAttribute('data-icon');
    this.setState({ selected, iconListIsVisible: false });
    this.props.onSelect(selected);
  }
}
