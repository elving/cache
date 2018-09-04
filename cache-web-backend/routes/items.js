import axios from 'axios';
import express from 'express';
import { merge, uniq, flatten } from 'lodash';

import createUrl from '../lib/createUrl';
import getHeaders from '../lib/getHeaders';
import parseResponse from '../lib/parseResponse';
import respondWithError from '../lib/respondWithError';
import getUserFromSession from '../lib/getUserFromSession';

const router = express.Router();

router.get('/', function(req, res) {
  let user, session;
  const { collection, fromPublicCollection } = req.query;

  if (!fromPublicCollection) {
    session = req.get('X-Session-Token');
    user = getUserFromSession(session);
  }

  if (!session && !fromPublicCollection) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!user && !fromPublicCollection) {
    res.status(500).json({ error: 'No user id in the provided session.' });
  } else if (!collection) {
    res.status(500).json({ error: 'No collection id provided.' });
  } else {
    axios.get(createUrl('/classes/Item'), {
      params: {
        order: '-createdAt',
        where: {
          'collection': {
            '__type': 'Pointer',
            'objectId': collection,
            'className': 'Collection'
          }
        },
        include: 'collection.createdBy,createdBy'
      },
      headers: fromPublicCollection ? getHeaders() : getHeaders(session)
    }).then(function(response) {
      res.status(200).json(response.data.results);
    }).catch(function(response) {
      onRequestError(res, response);
    });
  }
});

router.post('/', function(req, res) {
  let newItem;
  const session = req.get('X-Session-Token');
  const user = getUserFromSession(session);
  const { type, directUrl, sourceUrl, collection } = req.body;

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!user) {
    res.status(500).json({ error: 'No user id in the provided session.' });
  } else if (!collection) {
    res.status(500).json({ error: 'No collection id provided.' });
  } else if (!type) {
    res.status(500).json({ error: 'No item type provided.' });
  } else if (!directUrl) {
    res.status(500).json({ error: 'No item directUrl provided.' });
  } else if (!sourceUrl) {
    res.status(500).json({ error: 'No item sourceUrl provided.' });
  } else {
    newItem = merge({
      ACL: {
        '*': { read: true },
        [user]: { read: true, write: true }
      },
      createdBy: {
        __type: 'Pointer',
        objectId: user,
        className: '_User'
      }
    }, req.body, {
      collection: {
        __type: 'Pointer',
        objectId: collection,
        className: 'Collection'
      }
    });

    axios.post(createUrl('/classes/Item'), newItem , {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(parseResponse(response, newItem));
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.put('/:id/', function(req, res) {
  const session = req.get('X-Session-Token');
  const user = getUserFromSession(session);
  const { id } = req.params;

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' });
  } else if (!user) {
    res.status(500).json({ error: 'No user id in the provided session.' });
  } else if (!id) {
    res.status(500).json({ error: 'No item id provided.' });
  } else {
    axios.put(createUrl(`/classes/Item/${id}`), req.body, {
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
    res.status(500).json({ error: 'No item id provided.' });
  } else {
    axios.delete(createUrl(`/classes/Item/${id}`), {
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json({ item: id });
    }).catch(function(response) {
      respondWithError(res, response);
    });
  }
});

router.get('/tags/', (req, res) => {
  const session = req.get('X-Session-Token')
  const user = getUserFromSession(session)

  if (!session) {
    res.status(500).json({ error: 'No user session provided.' })
  } else if (!user) {
    res.status(500).json({ error: 'No user id in the provided session.' })
  } else {
    axios.get(createUrl('/classes/Item'), {
      params: {
        limit: 1000,
        where: {
          createdBy: {
            __type: 'Pointer',
            objectId: user,
            className: '_User'
          }
        }
      },
      headers: getHeaders(session)
    }).then(function(response) {
      res.status(200).json(
        response.data.results && response.data.results.length
          ? uniq(flatten(response.data.results.map(item => item.tags)))
          : []
      )
    }).catch(function(response) {
      onRequestError(res, response)
    })
  }
})

export default router;
