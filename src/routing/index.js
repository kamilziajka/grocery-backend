'use strict';

import login from './login';

export default (app) => {
  let routers = [
    login
  ];

  routers.forEach(router => app.use('/', router));
}
