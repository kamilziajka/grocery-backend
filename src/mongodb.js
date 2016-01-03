'use strict';

import mongoose from 'mongoose';
import config from 'config';

const host = config.get('mongodb.host');
const port = config.get('mongodb.port');
const name = config.get('mongodb.name');

mongoose.connect(`mongodb://${host}:${port}/${name}`);

mongoose.model('User', {
  name: String,
  password: String
});
