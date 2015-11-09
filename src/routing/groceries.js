'use strict';

import { Router } from 'express';
import auth from '../auth';
import redis from '../redis';

let router = new Router();

router.get('/groceries', auth, (req, res) => {
  redis.keys(`user-${req.user.name}-groceries-*`, (error, keys) => {
    redis.mget(keys, (error, values) => {
      keys = keys.map(key => key.split('-').slice(-1)[0]);

      let groceries = {};

      keys.forEach((key, index) => groceries[key] = values[index]);

      res.json(groceries).end();
    });
  });
});

export default router;
