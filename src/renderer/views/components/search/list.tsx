import { song_search_list } from '@/renderer/store/song';
import { css } from '@emotion/css';
import { For, Show } from 'solid-js';
import Item from './item';
import { MusicType } from 'ting_lib/src/types/music';

const style = css`
  --size-img: 145px;
  --title-height: 20px;
  --text-height: 17px;
  padding: 0 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--size-img), var(--size-img)));
  grid-template-rows: repeat(
    auto-fit,
    calc(var(--size-img) + var(--title-height) + var(--text-height))
  );
  justify-content: center;
  gap: 5px 10px;
`;

export default () => {
  return (
    <div class={style}>
      <Show when={song_search_list()?.netease}>
        <For each={song_search_list()?.netease?.songs}>
          {(item) => <Item type={MusicType.Netease} data={item} />}
        </For>
      </Show>
      <Show when={song_search_list()?.qq?.list}>
        <For each={song_search_list()?.qq?.list}>
          {(item) => <Item type={MusicType.QQ} data={item} />}
        </For>
      </Show>
    </div>
  );
};
