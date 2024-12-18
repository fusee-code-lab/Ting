import type { MusicSearchType } from '@fuseecodelab/ting-lib';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

export const [search_val, set_search_val] = createSignal('');

export const [song_search_list, set_song_search_list] = createStore<{
  [key in MusicSearchType]?: {
    netease?: { [key: string]: any }
    qq?: { [key: string]: any }
  }
}>({});
