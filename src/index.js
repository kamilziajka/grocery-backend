'use strict';

import Express from 'express';
import config from 'config';

let app = new Express();

let port = config.get('http.port');

app.listen(port, () => console.log(`server up on port ${port}`));
