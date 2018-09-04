import axios from 'axios';
import express from 'express';
import { clone } from 'lodash';

import createUrl from '../lib/createUrl';
import getHeaders from '../lib/getHeaders';
import parseResponse from '../lib/parseResponse';
import respondWithError from '../lib/respondWithError';

const router = express.Router();

router.post('/', function(req, res) {
  const reqBody = clone(req.body);
  const { email, username, password } = reqBody;

  delete reqBody.password;

  if (!email) {
    res.status(500).json({ error: 'No email provided.' });
  } else if (!username) {
    res.status(500).json({ error: 'No username provided.' });
  } else if(!password) {
    res.status(500).json({ error: 'No password provided.' });
  } else {
    axios.post(createUrl('/users'), req.body, {
      headers: getHeaders()
    }).then(function(response) {
      res.status(200).json(parseResponse(response, reqBody));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.put('/:id/', function(req, res) {
  const { id } = req.params;
  const session = req.get('X-Session-Token');
  const { username } = req.body;

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!id) {
    res.status(500).json({ error: 'No user id provided.' });
  } else {
    axios.put(createUrl(`/users/${id}`), req.body, {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(parseResponse(response, req.body));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

export default router;
