import { song_search_list } from '@/renderer/store/song';
import { css } from '@emotion/css';
import { For, Show } from 'solid-js';
import Item from './item';
import { MusicType } from '@/types/music';

const style = css`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px 20px;
`;

export default () => {
  return (
    <div class={style}>
      <Show when={song_search_list()?.netease}>
        <For each={song_search_list()?.netease?.songs}>
          {(item) => <Item type={MusicType.Netease} data={item} />}
        </For>
      </Show>
      <Show when={song_search_list()?.qq?.songs}>
        <For each={song_search_list()?.qq?.songs}>
          {(item) => <Item type={MusicType.QQ} data={item} />}
        </For>
      </Show>
    </div>
  );
};
