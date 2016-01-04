'use strict';

import { Router } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import mongodb from '../mongodb';

const { SECRET, COOKIE } = config.get('jwt');
const router = new Router();

router.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).end();
  }

  const User = mongodb.model('User');

  User.findOne({name, password}, (error, obj) => {
    if (error) {
      return res.status(500).end();
    }

    if (!obj) {
      return res.status(403).end();
    }

    const token = jwt.sign({name}, SECRET);

    return res
      .cookie(COOKIE, token)
      .status(200)
      .end();
  });
});

export default router;
