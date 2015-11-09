'use strict';

import Express from 'express';
import config from 'config';

import routing from './routing';

let app = new Express();

routing(app);

let port = config.get('http.port');

app.listen(port, () => console.log(`server up on port ${port}`));
