'use strict';

import mongoose from 'mongoose';
import config from 'config';

const { host, port, name } = config.get('mongodb');
const uri = `mongodb://${host}:${port}/${name}`;

const connection = mongoose.createConnection(uri);

connection.on('error', () => console.log('mongodb connection error'));
connection.on('disconnected', () => console.log('mongodb disconnected'));

connection.model('User', {
  name: String,
  password: String
});

connection.model('Item', {
  name: String,
  quantity: Number,
  guid: String,
  user: String,
  priority: Number,
  category: String,
  update: String
});

export default connection;
