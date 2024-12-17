import { search_val, song_search_list } from '@/renderer/store/song';
import { css } from '@emotion/css';
import { For, Show } from 'solid-js';
import Item from './item';
import { MusicType } from 'ting-lib/src/types/music';

const titleStyle = css`
  padding: 0 30px 10px;
  font-size: var(--size-lg);
  > .em {
    font-weight: 600;
    color: var(--blue-color);
  }
`;

const style = css`
  --size-img: 135px;
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

const ListTitle = () => (
  <Show when={!!search_val()}>
    <div class={titleStyle}>
      <span class="em">“{search_val()}”</span> 的搜索结果
    </div>
  </Show>
);

export default () => {
  return (
    <>
      <ListTitle />
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
    </>
  );
};
