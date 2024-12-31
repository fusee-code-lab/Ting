import { search_val, song_search_list } from '@/renderer/store/song';
import { css } from '@emotion/css';
import { createSignal, For, Show } from 'solid-js';
import { Item, PlaylistItem } from './item';
import type { MusicSearchType, SongItem } from '@/types/music';
import { SheetAdd } from '../../playlist/sheet_add';

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
  gap: 8px 10px;
`;

const ListTitle = (props: { title: string }) => (
  <Show when={!!search_val()}>
    <div class={listTitleStyle}>{props.title}</div>
  </Show>
);

export const ListData = (props: { key: MusicSearchType }) => {
  const [show, set_show] = createSignal(false);
  const [songs, set_songs] = createSignal<SongItem[]>([]);
  switch (props.key) {
    case 'single': {
      return (
        <div>
          <ListTitle title="单曲" />
          <div class={style}>
            <For each={song_search_list[props.key]?.list}>
              {(item) => (
                <Item
                  onAddClick={(song) => {
                    set_songs([song]);
                    set_show(true);
                  }}
                  data={item}
                />
              )}
            </For>
          </div>
          <SheetAdd onClick={() => set_show(false)} visible={show()} songs={songs()} />
        </div>
      );
    }
    case 'playlist': {
      return (
        <div style="margin-top: 15px">
          <ListTitle title="歌单" />
          <div class={style}>
            <For each={song_search_list[props.key]?.list}>
              {(item) => <PlaylistItem data={item} />}
            </For>
          </div>
        </div>
      );
    }
  }
  return;
};
