'use strict';

import home from './home';
import login from './login';
import groceries from './groceries';

export default (app) => {
  let routers = [login, home, groceries];

  routers.forEach(router => app.use('/', router));
}
