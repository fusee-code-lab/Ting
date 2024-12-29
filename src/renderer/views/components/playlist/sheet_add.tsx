import { playlist_list_data, playlist_list_data_add } from '@/renderer/store/playlist';
import { SongItem } from '@/types/music';
import { Playlist } from '@/types/playlist';
import { css, cx } from '@emotion/css';
import { For, Show } from 'solid-js';

import play_list_icon from '@/assets/icons/play_list_icon.png';
import play_list_icon2x from '@/assets/icons/play_list_icon@2x.png';
import { scrollYStyle, textEllipsis } from '@/renderer/views/styles';
import { unwrap } from 'solid-js/store';
import { PlusIcon } from '@/renderer/views/components/basis/icons';
import { createDialogWindow } from '@/renderer/common/dialog';

const style = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  > .content {
    width: 345px;
    max-height: 50vh;
    background-color: var(--basic-color);
    border-radius: var(--size-radius-xs);
    padding: 15px 0;
    > .title {
      padding: 0 15px;
      height: 24px;
      font-size: var(--size-xxl);
    }
    > .list {
      padding: 15px;
      height: calc(100% - 24px);
      > .add {
        padding-top: 10px;
        color: var(--blue-color);
        font-size: var(--size-xxs);
        > span {
          font-size: var(--size-xxs);
          color: var(--blue-color);
          margin-right: 5px;
        }
      }
    }
  }
`;

const playListItemStyle = css`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--gray-color);
  border-radius: var(--size-radius-xs);
  --size-icon: 21px;
  padding: 0 15px;
  margin-bottom: 5px;
  > .icon {
    width: var(--size-icon);
    height: var(--size-icon);
    object-fit: contain;
  }
  > .title {
    width: calc(100% - var(--size-icon));
    padding-left: 5px;
    font-size: var(--size-xxs);
  }
`;

const PlaylistItem = (props: { onClick?: (e: MouseEvent) => void; data: Playlist }) => {
  return (
    <div class={playListItemStyle} onClick={props.onClick}>
      <img
        class="icon"
        srcset={`${play_list_icon} 1x, ${play_list_icon2x} 2x`}
        src={play_list_icon2x}
      />
      <div class={cx('title', textEllipsis)}>{props.data.name}</div>
    </div>
  );
};
const PlaylistList = (props: { onClick?: (e: MouseEvent) => void; songs: SongItem[] }) => {
  return (
    <For each={playlist_list_data}>
      {(item) => (
        <PlaylistItem
          data={item}
          onClick={(e) => {
            e.stopPropagation();
            playlist_list_data_add(item.key, unwrap(props.songs));
            props.onClick && props.onClick(e);
          }}
        />
      )}
    </For>
  );
};

export const SheetAdd = (props: {
  onClick?: (e: MouseEvent) => void;
  visible?: boolean;
  songs: SongItem[];
}) => {
  return (
    <Show when={props.visible}>
      <div class={style} onClick={props.onClick}>
        <div class="content">
          <div class="title">添加到</div>
          <div class={cx('list', scrollYStyle)}>
            <PlaylistList onClick={props.onClick} songs={props.songs} />{' '}
            <div
              class="add"
              onClick={(e) => {
                e.stopPropagation();
                createDialogWindow('/playlist_create');
              }}
            >
              <PlusIcon />
              添加新歌单
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
