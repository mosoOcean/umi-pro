import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/wujian/Documents/github/umi-pro/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/wujian/Documents/github/umi-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
          LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
            exact: true,
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Welcome" */ '../Welcome'),
                  LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Welcome').default,
            exact: true,
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Admin" */ '../Admin'),
                  LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../Admin').default,
            authority: ['admin'],
            exact: true,
          },
          {
            name: '分析页',
            icon: 'smile',
            path: '/dashboardanalysis',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__DashboardAnalysis__model.jsx' */ '/Users/wujian/Documents/github/umi-pro/src/pages/DashboardAnalysis/model.jsx').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__DashboardAnalysis" */ '../DashboardAnalysis'),
                  LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../DashboardAnalysis').default,
            exact: true,
          },
          {
            name: '个人设置',
            icon: 'smile',
            path: '/accountsettings',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__AccountSettings__model.js' */ '/Users/wujian/Documents/github/umi-pro/src/pages/AccountSettings/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__AccountSettings" */ '../AccountSettings'),
                  LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../AccountSettings').default,
            exact: true,
          },
          {
            name: '设备管理',
            icon: 'smile',
            path: '/equipment',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__equipment" */ '../equipment'),
                  LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../equipment').default,
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/wujian/Documents/github/umi-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/wujian/Documents/github/umi-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/wujian/Documents/github/umi-pro/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/wujian/Documents/github/umi-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
