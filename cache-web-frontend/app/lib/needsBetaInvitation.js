import React from 'react';

import DB from 'lib/db';
import session from 'lib/session';

const needsBetaInvitation = Component => class extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      invitationChecked: false,
      hasValidInvitation: false
    };
  }

  componentDidMount() {
    const { invite } = this.props.query;

    DB.beta.getInvite(invite).then((invitation) => {
      this.setState({
        invitation,
        invitationChecked: true,
        hasValidInvitation: !invitation.redeemed
      });
    }).catch(() => {
      this.setState({
        invitation: null,
        invitationChecked: true,
        hasValidInvitation: false
      });
    });
  }

  render() {
    const { invite } = this.props.query;
    const { invitation, invitationChecked, hasValidInvitation } = this.state;

    if (invitationChecked && hasValidInvitation) {
       return <Component {...this.props} inviteId={invitation.objectId}/>;
    } else if (!invitationChecked && invite) {
      return (
        <div className="Auth__beta-invite">
          <h1>Validating beta invitation code...</h1>
          <div className="Auth__beta-invite__loader"/>
        </div>
      );
    } else if (!hasValidInvitation) {
      return (
        <div className="Auth__beta-invite">
          <h1>Invalid beta invitation code.</h1>
        </div>
      );
    } else if (!invite) {
      return (
        <div className="Auth__beta-invite">
          <h1>No beta invitation code found.</h1>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default needsBetaInvitation;
