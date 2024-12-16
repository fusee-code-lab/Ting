import { createSignal } from 'solid-js';

export const [search_val, set_search_val] = createSignal('');

export const [song_search_list, set_song_search_list] = createSignal<any>();
