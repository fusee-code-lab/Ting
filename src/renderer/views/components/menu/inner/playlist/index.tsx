import { css } from '@emotion/css';
import { Item, ItemTitle } from './item';
import { For } from 'solid-js';
import { playlist_local_data } from '@/renderer/store/playlist';
import { PlusIcon } from '../../../basis/icons';
import { createDialogWindow } from '@/renderer/common/dialog';
import { playlist_local_load } from '@/renderer/store/playlist';

const style = css`
  padding-top: 10px;
  > .add {
    padding-top: 2px;
    color: var(--blue-color);
    font-size: var(--size-xxxs);
    > span {
      font-size: var(--size-xxxs);
      color: var(--blue-color);
      margin-right: 5px;
    }
  }
`;

export const Playlist = () => {
  return (
    <div class={style}>
      <ItemTitle title="歌单" />
      <For each={playlist_local_data}>
        {(item, index) => (
          <Item onClick={() => playlist_local_load(index())} class="item" data={item} />
        )}
      </For>
      <div class="add" onClick={() => createDialogWindow('/playlist_create')}>
        <PlusIcon />
        添加新歌单
      </div>
    </div>
  );
};
