import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Header from 'components/Header';
import connectToStores from 'flummox/connect';
import UserPasswordForm from 'components/UserPasswordForm';
import UserInformationForm from 'components/UserInformationForm';
import needsAuthentication from 'lib/needsAuthentication';

class UserSettings extends React.Component {
  render() {
    const { user } = this.props;
    const lastName = user.lastName || '';
    const firstName = user.firstName || '';

    return (
      <div className="Auth UserSettings">
        <Header/>

        <div className="Auth__content">
          <Tabs>
            <TabList>
              <Tab>Update your information</Tab>
              <Tab>Change your password</Tab>
            </TabList>

            <TabPanel>
              <div className="Auth__form-wrapper">
                <UserInformationForm
                  id={user.objectId}
                  name={(`${firstName} ${lastName}`).trim()}
                  username={user.username}
                  isEditing={user.isEditing}/>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="Auth__form-wrapper">
                <UserPasswordForm id={user.objectId} username={user.username}/>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default needsAuthentication(
  connectToStores(
    UserSettings, ['user'], ([userStore]) => ({
      user: userStore.state
    })
  )
);
