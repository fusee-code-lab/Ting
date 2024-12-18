import { Component, createSignal, lazy } from 'solid-js';
import { createStore } from 'solid-js/store';

type ContentView = 'search_list' | 'play_list_details';

const content_routes: { [key in ContentView]: Component } = {
  search_list: lazy(() => import('@/renderer/views/components/content/search_list')),
  play_list_details: lazy(() => import('@/renderer/views/components/content/play_list_details'))
};

export const [content_router, set_content_router] = createStore<{
  path?: ContentView;
  history: ContentView[];
}>({
  history: []
});

export const set_content_route = (key: ContentView) => {
  set_content_router('path', key);
  set_content_router('history', (history) => {
    history.unshift(key);
    history.length >= 10 && history.pop();
    return history;
  });
};

export const back_content_route = () => {
  if (content_router.history.length > 0) {
    const key = content_router.history[0];
    set_content_router('path', key);
    set_content_router('history', (history) => history.filter((e) => e !== key));
  }
};

export const content_view = () => content_routes[content_router.path!];
