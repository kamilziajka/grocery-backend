'use strict';

import { Router } from 'express';
import config from 'config';

let router = new Router();

router.get('/', (req, res) => {
  res.json({
    version: config.get('version')
  }).end();
});

export default router;
