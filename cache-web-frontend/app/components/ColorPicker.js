import React from 'react';
import classNames from 'classnames';
import itemColors from 'lib/itemColors';

import AppIcon from 'components/AppIcon';

export default class ColorPicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { selected: props.selected || null };
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    return (
      <div className="color-picker">
        {itemColors.map(this.renderColor.bind(this))}
      </div>
    );
  }

  renderColor(color) {
    const { selected } = this.state;

    const colorClasses = classNames({
      'color-picker__color': true,
      'color-picker__color--selected': color === selected
    });

    return (
      <button
        key={`color-picker-${color}`}
        type="button"
        onClick={() => {
          const current = color === selected ? null : color;
          this.setState({ selected: current }, () => {
            this.props.onChange(current);
          });
        }}
        className={colorClasses}
        data-color={color}
      >
        <span>{this.renderIcon(color)}</span>
      </button>
    );
  }

  renderIcon(color) {
    return (
      <AppIcon
        name={this.state.selected === color ? 'close' : 'apply'}
        size="22px"
        color="#ffffff"
        className="color-picker__color__icon"
      />
    );
  }
}
