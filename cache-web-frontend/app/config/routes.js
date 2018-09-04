import React from 'react';
import Router from 'react-router';

import App from 'handlers/App';
import Login from 'handlers/Login';
import Logout from 'handlers/Logout';
import Register from 'handlers/Register';
import InvalidLink from 'handlers/InvalidLink';
import ValidateEmail from 'handlers/ValidateEmail';
import EmailVerified from 'handlers/EmailVerified';
import ResetPassword from 'handlers/ResetPassword';
import PasswordChanged from 'handlers/PasswordChanged';
import RequestPasswordReset from 'handlers/RequestPasswordReset';

import Item from 'handlers/Item';
import EditItem from 'handlers/EditItem';
import CreateItem from 'handlers/CreateItem';
import Collection from 'handlers/Collection';
import Collections from 'handlers/Collections';
import UserSettings from 'handlers/UserSettings';
import EditCollection from 'handlers/EditCollection';
import CollectionsIndex from 'handlers/CollectionsIndex';
import CreateCollection from 'handlers/CreateCollection';

const { Route, Redirect, DefaultRoute } = Router;

const routes = (
  <Route name="app" handler={App} path="/">
    <Redirect from="/" to="login"/>

    // Internal
    <Route name="invalid" path="/invalid/?" handler={InvalidLink}/>

   // Auth
    <Route name="register" path="/register/?" handler={Register}/>

    <Route
      name="validate-email"
      path="/validate-email/?"
      handler={ValidateEmail}
    />

    <Route
      name="email-verified"
      path="/email-verified/?"
      handler={EmailVerified}
    />

    <Route name="login" path="/login/?" handler={Login}/>
    <Route name="logout" path="/logout/?" handler={Logout}/>

    <Route
      name="request-password-reset"
      path="/request-password-reset/?"
      handler={RequestPasswordReset}
    />

    <Route
      name="reset-password"
      path="/reset-password/?"
      handler={ResetPassword}
    />

    <Route
      name="password-changed"
      path="/password-changed/?"
      handler={PasswordChanged}
    />

    // User
    <Route
      name="user-settings"
      path="/user/settings/?"
      handler={UserSettings}
    />

   // Collection
    <Route name="collections" path="/collections/?" handler={Collections}>
      <DefaultRoute
        name="collections-index"
        handler={CollectionsIndex}
      />

      <Route
        name="create-collection"
        path="/collections/create/?"
        handler={CreateCollection}
      />

      <Route
        name="collection"
        path="/collections/:collection/?"
        handler={Collection}
      />

      <Route
        name="edit-collection"
        path="/collections/:collection/edit/?"
        handler={EditCollection}
      />

      <Route
        name="item"
        path="/collections/:collection/:item/?"
        handler={Item}
      />

      <Route
        name="edit-item"
        path="/collections/:collection/:item/edit/?"
        handler={EditItem}
      />
    </Route>

    // Extension Specific
    <Route
      name="create-item"
      path="/items/create/?"
      handler={CreateItem}/>
  </Route>
);

export default routes;
