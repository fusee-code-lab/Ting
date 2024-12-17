import { type RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

const routes: RouteDefinition[] = [
  {
    path: '/welcome',
    component: lazy(() => import('@/renderer/views/pages/welcome'))
  },
  {
    path: '/home',
    component: lazy(() => import('@/renderer/views/pages/home'))
  }
];

export default routes;
