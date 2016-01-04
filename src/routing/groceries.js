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

    const groceries = items.map(
      ({guid, name, quantity}) => ({guid, name, quantity})
    );

    return res
      .status(200)
      .json(groceries)
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
