/* eslint-disable max-len */
import jsonp from 'jsonp';
import $script from 'scriptjs';
import React, { Component } from 'react';

import AppIcon from 'components/AppIcon';

export default class TwitterCard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      oembedHTML: null,
      oembedLoaded: false
    };
  }

  componentDidMount() {
    const { url } = this.props;
    const oembedUrl = (
      `https://api.twitter.com/1/statuses/oembed.json?url=${url}&omit_script=true`
    );

    jsonp(oembedUrl, null, (error, response) => {
      if (error) {
        this.setState({
          oembedHTML: null,
          oembedLoaded: true
        });
      } else {
        this.setState({
          oembedHTML: response.html,
          oembedLoaded: true
        });

        $script('https://platform.twitter.com/widgets.js');
      }
    });
  }

  render() {
    const { oembedHTML, oembedLoaded } = this.state;

    if (oembedLoaded) {
      if (oembedHTML) {
        return (
          <div className="iframeContainer" dangerouslySetInnerHTML={
            { __html: this.state.oembedHTML }
          }/>
        );
      } else {
        return (
          <div className="ImageContainer__error">
            <AppIcon
              name="close"
              color="#f4989c"
              className="ImageContainer__error__icon"
            />
            <span className="ImageContainer__error__text">
              Content not available
            </span>
          </div>
        );
      }
    } else {
      return (
        <img src={`${CACHE_STATIC_URL}/images/loading.svg`}/>
      );
    }
  }
}
