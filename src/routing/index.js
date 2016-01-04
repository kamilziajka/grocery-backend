'use strict';

import home from './home';
import login from './login';
import groceries from './groceries';

const routers = [ home, login, groceries ];

export default (app) => routers.forEach(router => {
  app.use('/', router);
});
