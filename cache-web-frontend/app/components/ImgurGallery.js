import axios from 'axios';
import $script from 'scriptjs';
import React, { Component } from 'react';

import AppIcon from 'components/AppIcon';

export default class ImgurGallery extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      oembedHTML: null,
      oembedLoaded: false
    };
  }

  componentDidMount() {
    const url = encodeURIComponent(
      `https://imgur.com/gallery/${this.props.id}/`
    );

    const oembedUrl = `https://api.imgur.com/oembed?url=${url}`;

    axios.get(oembedUrl).then((response) => {
      this.setState({
        oembedHTML: response.data.html,
        oembedLoaded: true
      });

      $script('https://s.imgur.com/min/embed.js');
    }).catch((error) => {
      this.setState({
        oembedHTML: null,
        oembedLoaded: true
      });
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
