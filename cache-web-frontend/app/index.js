import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
import Routes from 'config/routes';

Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
  React.render(
    <Handler {...state}/>,
    document.getElementById('application')
  );
});
