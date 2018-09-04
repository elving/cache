import fs from 'fs';
import hbs from 'hbs';
import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import inDevelopment from './lib/inDevelopment';

import { default as authRouter } from './routes/auth';
import { default as miscRouter } from './routes/misc';
import { default as usersRouter } from './routes/users';
import { default as itemsRouter } from './routes/items';
import { default as collectionsRouter } from './routes/collections';

const port = process.env.PORT || 8000;
const server = express();

// Get all data of the body (POST) parameters parse application/json
server.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

// Override with the X-HTTP-Method-Override header in the request
// to simulate DELETE/PUT
server.use(methodOverride('X-HTTP-Method-Override'));

// Accept requests from localhost:3000 in development.
if (inDevelopment()) {
  server.use(cors({ origin: 'http://localhost:3000' }));
}

// Set view engine
server.set('view engine', 'html');
server.engine('html', hbs.__express);
server.set('views', path.resolve(__dirname, 'views'));

// Send index.html for every request (SPA) expect for api calls
server.get('*', function (req, res, next) {
  if ((/api/).test(req.originalUrl)) {
    next();
  } else {
    res.render('index', { GIT_SHA: process.env.GIT_SHA });
  }
});

// Add routes before starting the server
server.use('/api/auth', authRouter);
server.use('/api/misc', miscRouter);
server.use('/api/users', usersRouter);
server.use('/api/items', itemsRouter);
server.use('/api/collections', collectionsRouter);

// Serve files from the public folder
server.use(express.static(path.resolve(__dirname, 'public')));

// Start the server
server.listen(port, function() {
  console.log(`Server listening at port ${port}`);
});

