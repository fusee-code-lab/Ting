import { Component, lazy } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

type ContentView = 'setting' | 'search_list' | 'playlist_details_online' | 'playlist_details';

const content_routes: { [key in ContentView]: Component } = {
  setting: lazy(() => import('@/renderer/views/components/content/setting')),
  search_list: lazy(() => import('@/renderer/views/components/content/search')),
  playlist_details: lazy(
    () => import('@/renderer/views/components/content/playlist/details')
  ),
  playlist_details_online: lazy(
    () => import('@/renderer/views/components/content/playlist/details_online')
  )
};

export const [content_router, set_content_router] = createStore<{
  path?: ContentView;
  history: ContentView[];
}>({
  history: []
});

export const set_content_route = (key: ContentView) => {
  if (content_router.path === key) return;
  set_content_router('path', key);
  set_content_router(
    'history',
    produce((history) => {
      history.unshift(key);
      history.length >= 10 && history.pop();
    })
  );
};

export const back_content_route = (num: number = 1) => {
  if (content_router.history.length > num) {
    const key = content_router.history[num];
    set_content_router('path', key);
    set_content_router(
      'history',
      produce((history) => {
        const index = history.findIndex((e) => e === key);
        index !== -1 && history.splice(0, index);
      })
    );
  } else {
    set_content_router('path', undefined);
    set_content_router('history', []);
  }
};

export const content_view = () => content_routes[content_router.path!];
