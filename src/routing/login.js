'use strict';

import { Router } from 'express';

let router = new Router();

router.post('/login', (req, res) => {
  res.end();
});

export default (app) => app.use('/', router);
