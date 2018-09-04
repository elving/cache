import axios from 'axios';
import express from 'express';
import { merge } from 'lodash';

import createUrl from '../lib/createUrl';
import getHeaders from '../lib/getHeaders';
import parseResponse from '../lib/parseResponse';
import respondWithError from '../lib/respondWithError';
import getUserFromSession from '../lib/getUserFromSession';

const router = express.Router();

router.get('/', function(req, res) {
  const session = req.get('X-Session-Token');
  const user = getUserFromSession(session);

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!user) {
    res.status(500).json({ error: 'No user id in the provided session.' });
  } else {
    axios.get(createUrl('/classes/Collection'), {
      params: {
        order: '-createdAt',
        where: {
          createdBy: {
            __type: 'Pointer',
            objectId: user,
            className: '_User'
          }
        },
        include: 'createdBy'
      },
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(response.data.results);
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.post('/', function(req, res) {
  let newCollection;
  const session = req.get('X-Session-Token');
  const user = getUserFromSession(session);
  const { name, icon } = req.body;

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!user) {
    res.status(500).json({ error: 'No user id in the provided session.' });
  } else if (!name) {
    res.status(500).json({ error: 'No collection name provided.' });
  } else if (!icon) {
    res.status(500).json({ error: 'No collection icon provided.' });
  } else {
    newCollection = merge({
      ACL: {
        '*': { read: true },
        [user]: { read: true, write: true }
      },
      createdBy: {
        __type: 'Pointer',
        objectId: user,
        className: '_User'
      }
    }, req.body);

    axios.post(createUrl('/classes/Collection'), newCollection, {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(parseResponse(response, newCollection));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.get('/:id/', function(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ error: 'No user collection id provided.' });
  } else {
    axios.get(createUrl(`/classes/Collection/${id}`), {
      params: { include: 'createdBy' },
      headers: getHeaders()
    }).then(function(response) {
      if (response.data.isPublic) {
        res.status(200).json(response.data);
      } else {
        res.status(500).json({ error: 'Collection not found.' });
      }
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.put(`/:id/`, function(req, res) {
  const session = req.get('X-Session-Token');
  const user = getUserFromSession(session);
  const { id } = req.params;

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!user) {
    res.status(500).json({ error: 'No user id in the provided session.' });
  } else if (!id) {
    res.status(500).json({ error: 'No collection id provided.' });
  } else {
    axios.put(createUrl(`/classes/Collection/${id}`), req.body, {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(parseResponse(response, req.body));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.delete('/:id/', function(req, res) {
  const session = req.get('X-Session-Token');
  const user = getUserFromSession(session);
  const { id } = req.params;

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!user) {
    res.status(500).json({ error: 'No user id in the provided session.' });
  } else if (!id) {
    res.status(500).json({ error: 'No collection id provided.' });
  } else {
    axios.delete(createUrl(`/classes/Collection/${id}`), {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json({ collection: id });
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});


router.get('/checkPrivacy/:id/', function(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ error: 'No collection id provided.' });
  } else {
    axios.get(createUrl(`/classes/Collection/${id}`), {
      headers: getHeaders()
    }).then(function(response) {
      res.status(200).json({ isPublic: response.data.isPublic });
    }).catch(function(response) {
      res.status(200).json({ isPublic: false });
    });
  }
});

export default router;
