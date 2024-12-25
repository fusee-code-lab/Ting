
import { Component, lazy } from 'solid-js';

const routes: { [key: string]: Component } = {
  '/playlist_create': lazy(() => import('@/renderer/views/dialogs/playlist_create')),
  '/welcome': lazy(() => import('@/renderer/views/pages/welcome')),
  '/home': lazy(() => import('@/renderer/views/pages/home'))
};

export default routes;
