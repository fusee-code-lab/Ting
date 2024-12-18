
import { Component, createSignal, lazy } from 'solid-js';

type ContentView = 'search_list' | 'play_list_details';

const content_routes: { [key in ContentView]: Component } = {
  'search_list': lazy(() => import('@/renderer/views/components/content/search_list')),
  'play_list_details': lazy(() => import('@/renderer/views/components/content/play_list_details'))
};

export const [content_route_path, set_content_route_path] = createSignal<ContentView>();

export const content_view = () => content_routes[content_route_path()!];