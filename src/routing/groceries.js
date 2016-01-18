'use strict';

import { Router } from 'express';
import auth from '../auth';
import mongodb from '../mongodb';

const Item = mongodb.model('Item');

const router = new Router();

export default router;

router.get('/groceries', auth, (req, res) => {
  const user = req.user.name;

  Item.find({user}, (error, items) => {
    if (error) {
      return res.status(500).end();
    }

    items.forEach(item => {
      item.category = item.category || 'default';
      item.priority = item.priority || 1;
      item.update = item.update || '2000-01-01T00:00:00+0000'
    });

    return res
      .status(200)
      .json(items)
      .end();
  });
});

router.post('/groceries', auth, (req, res) => {
  Item.findOne({guid: req.body.guid}, (error, item) => {
    if (error) {
      return res.status(500).end();
    }

    if (item) {
      return res.status(200).end();
    }

    (new Item({
      ...req.body,
      user: req.user.name
    })).save(error => {
      if (error) {
        return res.status(500).end();
      }

      return res.status(201).end();
    });
  });
});
