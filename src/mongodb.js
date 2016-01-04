'use strict';

import mongoose from 'mongoose';
import config from 'config';

const host = config.get('mongodb.host');
const port = config.get('mongodb.port');
const name = config.get('mongodb.name');
const uri = `mongodb://${host}:${port}/${name}`;

const connection = mongoose.createConnection(uri);

connection.on('error', () => {
  console.log('mongodb connection error')
});

connection.on('disconnected', () => {
  console.log('mongodb disconnected');
});

connection.model('User', {
  name: String,
  password: String
});

connection.model('Item', {
  name: String,
  quantity: Number,
  guid: String,
  user: String
});

export default connection;
