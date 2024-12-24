import { css } from '@emotion/css';
import { Item, ItemTitle } from './item';
import { For } from 'solid-js';
import { playlist_list_data } from '@/renderer/store/playlist';

const style = css`
  padding-top: 10px;
`;

export const Playlist = () => {
  return (
    <div class={style}>
      <ItemTitle title="歌单" />
      <For each={playlist_list_data}>{(item) => <Item class="item" data={item} />}</For>
    </div>
  );
};
