import { css } from '@emotion/css';
import { Item, ItemTitle } from './item';
import { For } from 'solid-js';
import { playlist_list_data } from '@/renderer/store/playlist';

const style = css`
  padding-top: 12px;
  > .item {
    padding-top: 10px;
  }
`;

export const Playlist = () => {
  return (
    <div class={style}>
      <For each={playlist_list_data}>{(item) => <Item class="item" data={item} />}</For>
    </div>
  );
};
