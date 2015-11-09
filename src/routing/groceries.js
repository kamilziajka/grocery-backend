'use strict';

import { Router } from 'express';
import auth from '../auth';

let router = new Router();

router.get('/groceries', auth, (req, res) => {
  res.json([]).end();
});

export default router;
