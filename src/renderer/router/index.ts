import { type RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

let routes: RouteDefinition[] = [
  {
    path: '/welcome',
    component: lazy(() => import('@/renderer/views/pages/welcome'))
  },
  {
    path: '/',
    component: lazy(() => import('@/renderer/views/layout')),
    children: [
      {
        path: '/home',
        component: lazy(() => import('@/renderer/views/pages/home'))
      }
    ]
  }
];

const router = (route?: string) => {
  if (route && route !== '/') {
    routes.unshift({
      path: '/',
      preload: () => (window.location.hash = '#' + route)
    });
  }
  return routes;
};

export default router;
