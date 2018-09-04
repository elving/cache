import React from 'react';
import { RouteHandler } from 'react-router';

import 'styles/index.styl';
import Flux from 'config/flux';
import Notification from 'components/Notification';
import FluxComponent from 'flummox/component';

const flux = new Flux();
flux.getActions('user').loginFromSession();

export default class App extends React.Component {
  render() {
    return (
      <FluxComponent
        flux={flux}
        render={() => {
          return (
            <div>
              <Notification/>
              <RouteHandler {...Object.assign({ flux }, this.props)}/>
            </div>
          );
        }
      }/>
    );
  }
}
