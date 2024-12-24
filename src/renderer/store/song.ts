import type { MusicSearchType } from '@/types/music';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

export const [search_val, set_search_val] = createSignal('');

export const [song_search_list, set_song_search_list] = createStore<{
  [key in MusicSearchType]?: {
    [key: string]: any
  }
}>({});
