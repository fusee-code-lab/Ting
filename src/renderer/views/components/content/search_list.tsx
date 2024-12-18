import { search_val, song_search_list } from '@/renderer/store/song';
import { css } from '@emotion/css';
import { For, Show } from 'solid-js';
import { Item, PlaylistItem } from './search_list_item';
import type { MusicSearchType } from '@fuseecodelab/ting-lib';

const searchTitleStyle = css`
  padding: 0 30px 15px;
  font-size: var(--size-lg);
  > .em {
    font-weight: 600;
    color: var(--blue-color);
  }
`;

const listTitleStyle = css`
  padding: 0 30px 15px;
  font-size: var(--size-xs);
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

const SearchTitle = () => (
  <Show when={!!search_val()}>
    <div class={searchTitleStyle}>
      <span class="em">“{search_val()}”</span> 的搜索结果
    </div>
  </Show>
);

const ListTitle = (props: { title: string }) => (
  <Show when={!!search_val()}>
    <div class={listTitleStyle}>{props.title}</div>
  </Show>
);

const ListData = (props: { key: MusicSearchType }) => {
  switch (props.key) {
    case 'single': {
      return (
        <div>
          <ListTitle title="单曲" />
          <div class={style}>
            <For
              each={[
                ...(song_search_list[props.key]?.netease?.songs || []),
                ...(song_search_list[props.key]?.qq?.list || [])
              ]}
            >
              {(item) => <Item data={item} />}
            </For>
          </div>
        </div>
      );
    }
    case 'playlist': {
      return (
        <div style="margin-top: 15px">
          <ListTitle title="歌单" />
          <div class={style}>
            <For
              each={[
                ...(song_search_list[props.key]?.netease?.playlists || []),
                ...(song_search_list[props.key]?.qq?.list || [])
              ]}
            >
              {(item) => <PlaylistItem data={item} />}
            </For>
          </div>
        </div>
      );
    }
  }
  return;
};

export default () => {
  return (
    <>
      <SearchTitle />
      <ListData key="single" />
      <ListData key="playlist" />
    </>
  );
};
