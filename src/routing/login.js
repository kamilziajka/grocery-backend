'use strict';

import { Router } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import redis from '../redis';

const SECRET = config.get('jwt.secret');
const COOKIE = config.get('jwt.cookie');

let router = new Router();

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end();
  }

  redis.get(`user-${username}`, (error, response) => {
    if (!!error) {
      res.status(500).end();
    }

    if (!response || password !== response) {
      res.status(403).end();
    }

    let token = jwt.sign({
      username: username
    }, SECRET);

    res
      .cookie(COOKIE, token)
      .status(200)
      .end();
  });
});

export default router;
