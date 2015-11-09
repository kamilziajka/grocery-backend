'use strict';

import Express from 'express';
import config from 'config';
import bodyParser from 'body-parser';

import routing from './routing';

const PORT = config.get('http.port');

export default () => {
  let app = new Express();
  app.use(bodyParser.json());

  routing(app);

  app.listen(PORT, () => console.log(`server up on port ${PORT}`));
}
