import { Component, createSignal, lazy } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

type ContentView = 'search_list' | 'play_list_details';

const content_routes: { [key in ContentView]: Component } = {
  search_list: lazy(() => import('@/renderer/views/components/content/search')),
  play_list_details: lazy(() => import('@/renderer/views/components/content/playlist'))
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
  }
};

export const content_view = () => content_routes[content_router.path!];
