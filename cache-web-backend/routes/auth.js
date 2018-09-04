import axios from 'axios';
import express from 'express';
import { first } from 'lodash';

import createUrl from '../lib/createUrl';
import getHeaders from '../lib/getHeaders';
import parseResponse from '../lib/parseResponse';
import respondWithError from '../lib/respondWithError';

const router = express.Router();

router.get('/invite/:code/', function(req, res) {
  const { code } = req.params;
  const codeNotFound = `No invite matching ${code} was found.`;

  if (!code) {
    res.status(500).json({ error: 'No valid invite code provided.' });
  } else {
    axios.get(createUrl('/classes/BetaInvites'), {
      params: { where: { code } },
      headers: getHeaders()
    }).then(function(response) {
      if (response.data.results && !response.data.results.length) {
        res.status(500).json({ error: codeNotFound });
      } else {
        res.status(200).json(first(response.data.results));
      }
    }).catch(function(response) {
      res.status(500).json({ error: codeNotFound });
    });
  }
});

router.put('/invite/:code/', function(req, res) {
  const { code } = req.params;

  if (!code) {
    res.status(500).json({ error: 'No valid invite code provided.' });
  } else {
    axios.put(`${createUrl('/classes/BetaInvites')}/${code}`, req.body, {
      headers: getHeaders()
    }).then(function(response) {
      res.status(200).json(parseResponse(response, req.body));
    }).catch(function(response) {
      res.status(500).json({ error: 'The invite code was not redeemable.' });
    });
  }
});

router.get('/login/', function(req, res) {
  const { username, password } = req.query;

  if (!username) {
    res.status(500).json({ error: 'No username provided.' });
  } else if (!password) {
    res.status(500).json({ error: 'No password provided.' });
  } else {
    axios.get(createUrl('/login'), {
      params: req.query,
      headers: getHeaders()
    }).then(function(response) {
      res.status(200).json(parseResponse(response, { username }));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.get('/validate/', function(req, res) {
  const session = req.get('X-Session-Token');

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else {
    axios.get(createUrl('/users/me'), {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(parseResponse(response));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.post('/resetPassword/', function(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(500).json({ error: 'No email provided.' });
  } else {
    axios.post(createUrl('/requestPasswordReset'), { email }, {
      headers: getHeaders()
    }).then(function(response) {
      res.status(200).json(parseResponse(response));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.get('/validatePassword/', function (req, res) {
  const { username, currentPassword, newPassword } = req.query;

  if (!req.query.currentPassword) {
    res.status(500).json({ error: 'No current password provided' });
  } else if (!req.query.newPassword) {
    res.status(500).json({ error: 'No new password provided' });
  } else if (!req.query.username) {
    res.status(500).json({ error: 'No username provided' });
  } else {
    axios.get(createUrl('/login'), {
      params: { username, password: currentPassword },
      headers: getHeaders()
    }).then(function(response) {
      if (response.data.sessionToken) {
        axios.post(createUrl('/logout'), {}, {
          headers: {
            'X-Parse-REST-API-Key': process.env.PARSE_REST_API_KEY,
            'X-Parse-Session-Token': response.data.sessionToken,
            'X-Parse-Application-Id': process.env.PARSE_APPLICATION_ID
          }
        }).then(function(response) {
          res.status(200).json({ success: 'Password validated.' });
        }).catch(function(response) {
          respondWithError(res, response);
        });
      } else {
        res.status(500).json({ error: 'Invalid current password.' });
      }
    }).catch(function(response) {
      res.status(500).json({ error: 'Invalid current password.' });
    });
  }
});

router.post('/logout/', function(req, res) {
  const session = req.get('X-Session-Token');

  if (!session) {
    res.status(500).json({ error: 'No session provided.' });
  } else {
    axios.post(createUrl('/logout'), {}, {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(parseResponse(response));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

export default router;
