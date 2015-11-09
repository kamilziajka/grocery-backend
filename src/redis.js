'use strict';

import config from 'config';
import redis from 'redis';

export default redis.createClient({
  host: config.get('redis.host'),
  port: config.get('redis.port')
});
