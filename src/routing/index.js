'use strict';

import home from './home';
import login from './login';

const routers = [
  home,
  login
];

export default (app) => routers.forEach(router => {
  app.use('/', router);
});
