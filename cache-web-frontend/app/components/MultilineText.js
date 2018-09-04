import React from 'react';
import { compact } from 'lodash';

export default class MultineText extends React.Component {
  static defaultProps = {
    useBreaks: true,
    lineClass: ''
  }

  render() {
    const { text } = this.props;

    return (
      <span dangerouslySetInnerHTML={{
        __html: text ? text.replace(/[\n\r]|(\s\s)/gm, '<br/><br/>') : null
      }}/>
    );
  }
}
