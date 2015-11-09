'use strict';

import { Router } from 'express';
import auth from '../auth';
import redis from '../redis';

let router = new Router();

router.get('/groceries', auth, (req, res) => {
  redis.keys(`user-${req.user.name}-*`, (error, keys) => {
    if (!!error) {
      return res.status(500).end();
    }

    redis.mget(keys, (error, values) => {
      if (!!error) {
        return res.status(500).end();
      }

      keys = keys.map(key => key.split('-').slice(-1)[0]);

      let groceries = {};

      keys.forEach((key, index) => groceries[key] = values[index]);

      res.json(groceries).end();
    });
  });
});

router.post('/groceries/:name', auth, (req, res) => {
  let key = `user-${req.user.name}-${req.params.name}`;

  redis.get(key, (error, response) => {
    if (!!error) {
      return res.status(500).end();
    }

    if (typeof response === 'string') {
      return res.status(406).end();
    }
  });

  redis.set(key, 0, error => {
    if (!!error) {
      return res.status(500).end();
    }

    res.status(201).end();
  });
});

router.put('/groceries/:name/:quantity', auth, (req, res) => {
  let key = `user-${req.user.name}-${req.params.name}`;
  let quantity = req.params.quantity;

  redis.get(key, (error, response) => {
    if (!!error) {
      return res.status(500).end();
    }

    if (typeof response !== 'string') {
      return res.status(406).end();
    }
  });

  redis.set(key, quantity, error => {
    if (!!error) {
      return res.status(500).end();
    }

    res.status(200).end();
  });
});

router.delete('/groceries/:name', auth, (req, res) => {
  let key = `user-${req.user.name}-${req.params.name}`;

  redis.get(key, (error, response) => {
    if (!!error) {
      return res.status(500).end();
    }

    if (typeof response !== 'string') {
      return res.status(406).end();
    }
  });

  redis.del(key, error => {
    if (!!error) {
      return res.status(500).end();
    }

    res.status(200).end();
  });
});

export default router;
