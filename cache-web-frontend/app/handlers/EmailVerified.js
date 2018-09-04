import React from 'react';
import { Link } from 'react-router';

import Header from 'components/Header';
import session from 'lib/session';
import { clone } from 'lodash';

export default class EmailVerified extends React.Component {
  componentDidMount() {
    const user = clone(session.user);
    user.emailVerified = true;
    session.set(user);
  }

  render() {
    return (
      <div className="EmailVerified">
        <Header/>

        <div className="EmailVerified__content">
          <h1 className="EmailVerified__title">
            Your email address has been verified!
          </h1>

          {this.renderContinueLink()}
        </div>
      </div>
    );
  }

  renderContinueLink() {
    const classes = 'button button--primary';
    const guideUrl = 'http://www.trycache.co/how-it-works';

    return session.userIsLoggedIn ? (
      <div>
        <a href={guideUrl} target="_blank" className={classes}>
          Learn how Cache works
        </a>
        <strong>or</strong>
        <Link to="create-collection" className={classes}>
          Create your first collection
        </Link>
      </div>
    ) : (
      <div>
        <a href={guideUrl} target="_blank" className={classes}>
          Learn how Cache works
        </a>
        <strong>or</strong>
        <Link
          to="login"
          query={{nextPath: '/collections/create/'}}
          className={classes}
        >
          Create your first collection
        </Link>
      </div>
    );
  }
}
