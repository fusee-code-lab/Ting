import { search_val, song_search_list } from '@/renderer/store/song';
import { css } from '@emotion/css';
import { For, Show } from 'solid-js';
import { Item, PlaylistItem } from './item';
import type { MusicSearchType } from '@/types/music';

const listTitleStyle = css`
  position: sticky;
  top: -1px;
  padding: 0 30px 15px;
  font-size: var(--size-xs);
  background-color: var(--basic-color);
`;

const style = css`
  --size-img: 135px;
  --title-height: 24px;
  --text-height: 16px;
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

const ListTitle = (props: { title: string }) => (
  <Show when={!!search_val()}>
    <div class={listTitleStyle}>{props.title}</div>
  </Show>
);

export const ListData = (props: { key: MusicSearchType }) => {
  switch (props.key) {
    case 'single': {
      return (
        <div>
          <ListTitle title="单曲" />
          <div class={style}>
            <For each={song_search_list[props.key]?.songs}>{(item) => <Item data={item} />}</For>
          </div>
        </div>
      );
    }
    case 'playlist': {
      return (
        <div style="margin-top: 15px">
          <ListTitle title="歌单" />
          <div class={style}>
            <For each={song_search_list[props.key]?.playlists}>
              {(item) => <PlaylistItem data={item} />}
            </For>
          </div>
        </div>
      );
    }
  }
  return;
};
