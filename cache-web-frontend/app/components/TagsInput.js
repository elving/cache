import React from 'react';
import Select from 'react-select';

import AppIcon from 'components/AppIcon';
import { isArray, isEqual, compact, without } from 'lodash';

export default class TagsInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { tags: isArray(props.tags) ? props.tags : [] };
  }

  static defaultProps = {
    onTagsChange: function() { return; }
  }

  componentWillReceiveProps(nextProps) {
    const nextTags = nextProps.tags;
    const currentTags = this.props.tags;

    if (isArray(nextTags) && !isEqual(currentTags, nextTags)) {
      this.setState({ tags: nextTags });
    }
  }

  render() {
    return (
      <div className="TagsInput">
        <Select
          multi={true}
          options={this.props.tags.map(
            (tag) => ({ value: tag, label: `#${tag}` })
          )}
          onChange={(value) => { console.log(value); }}
          allowCreate={true}
          addLabelText={`Add "{label}" as a new tag`}
        />
      </div>
    );
  }

  renderHelp() {
    return this.props.showHelp ? (
      <small className="instructions">Press &lt;enter&gt; to add a tag</small>
    ) : null;
  }

  renderTags() {
    return this.state.tags.map((tag) => {
      return (
        <strong
          key={`tagsInput-${tag}`}
          className="TagsInput__tag">
          {tag}
          <button
            type="button"
            onClick={this.onRemoveTagClick.bind(this)}
            data-tag={tag}
            className="TagsInput__remove">
            <span>
              <AppIcon name="close" size="14px" color="#fcfcfc"/>
            </span>
          </button>
        </strong>
      );
    });
  }

  handleKeyboard(event) {
    const tags = this.state.tags.slice();
    const { value } = event.target;
    const { keyCode } = event;

    if (keyCode === 13 || (/,/g).test(value)) {
      event.preventDefault();
      event.target.value = '';

      if (value) {
        value.split(' ').forEach((tag) => {
          tags.push(tag.replace(/\s|,|\W|_/g, ''));
          this.setState({ tags }, () => {
            this.props.onTagsChange(this.state.tags);
          });
        });
      }
    }
  }

  onRemoveTagClick(event) {
    const tag = event.currentTarget.attributes['data-tag'].value;
    const tags = this.state.tags.slice();

    this.setState({ tags: without(tags, tag) }, () => {
      this.props.onTagsChange(this.state.tags);
    });
  }
}
