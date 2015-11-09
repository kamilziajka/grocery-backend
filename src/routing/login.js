'use strict';

import { Router } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import redis from '../redis';

const SECRET = config.get('jwt.secret');
const COOKIE = config.get('jwt.cookie');

let router = new Router();

router.post('/login', (req, res) => {
  let { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).end();
  }

  redis.get(`user-${name}`, (error, response) => {
    if (!!error) {
      return res.status(500).end();
    }

    if (!response || password !== response) {
      return res.status(403).end();
    }

    let token = jwt.sign({
      name: name
    }, SECRET);

    return res
      .cookie(COOKIE, token)
      .status(200)
      .end();
  });
});

export default router;
