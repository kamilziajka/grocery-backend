'use strict';

import config from 'config';
import jwt from 'express-jwt';

const secret = config.get('jwt.secret');

export default jwt({
  secret: secret,
  getToken: (req) => req.cookies[config.get('jwt.cookie')]
})
