'use strict';

import home from './home';
import login from './login';

export default (app) => {
  let routers = [login, home];

  routers.forEach(router => app.use('/', router));
}
