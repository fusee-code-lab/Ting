
import { Component, lazy } from 'solid-js';

const routes: { [key: string]: Component } = {
  '/welcome': lazy(() => import('@/renderer/views/pages/welcome')),
  '/home': lazy(() => import('@/renderer/views/pages/home'))
};

export default routes;
