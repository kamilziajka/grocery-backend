'use strict';

import config from 'config';
import jwt from 'express-jwt';

const SECRET = config.get('jwt.secret');

export default jwt({
  secret: SECRET,
  getToken: (req) => req.cookies[config.get('jwt.cookie')]
})
