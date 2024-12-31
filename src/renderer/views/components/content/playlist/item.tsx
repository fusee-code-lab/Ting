import { audioPlay, is_audio_play_ing_data } from '@/renderer/store/audio';
import { scrollYStyle, textEllipsis } from '@/renderer/views/styles';
import { css, cx } from '@emotion/css';
import { SongItem } from '@/types/music';
import { VList } from 'virtua/solid';
import { formatTime } from '@/renderer/common/utils';
import { createSignal, Show } from 'solid-js';
import { SheetAdd, SheetAddIcon } from '../../playlist/sheet_add';
import { unwrap } from 'solid-js/store';
import { menuSong } from '@/renderer/common/menu/song';
import { MusicIcon } from '../../basis/music_icon';

const songListTableStyle = css`
  > div {
    &:nth-child(1) {
      padding-left: 12px;
      width: 50%;
    }
    &:nth-child(2) {
      padding-left: 15px;
      width: 35%;
    }
    &:nth-child(3) {
      width: 15%;
      text-align: center;
    }
  }
`;

const songListItemStyle = css`
  display: flex;
  align-items: center;
  height: 50px;
  font-size: var(--size-xxxs);
  border-radius: var(--size-radius-xs);
  &.ing {
    color: var(--blue-color);
  }
  &:hover {
    > .song > .add {
      display: flex;
    }
  }
  > .song {
    position: relative;
    display: flex;
    align-items: center;
    --size-img: 32px;
    > .icon {
      width: var(--size-img);
      height: var(--size-img);
      object-fit: cover;
      border-radius: var(--size-radius-xs);
    }
    > .info {
      width: calc(100% - var(--size-img));
      padding-left: 8px;
      > .name {
        font-size: var(--size-xxs);
      }
      > .artists {
        font-size: var(--size-xxxs);
        color: var(--secondary-label-color);
        > .icon {
          width: var(--size-xxxs);
          height: var(--size-xxxs);
          margin-right: 4px;
        }
      }
    }
    > .add {
      position: absolute;
      right: 5px;
      display: none;
    }
  }
`;

const SongListItem = (props: {
  onContextMenu?: (song: SongItem) => void;
  onAddClick?: (song: SongItem) => void;
  online?: boolean;
  data: SongItem;
}) => {
  return (
    <div
      class={cx(
        songListItemStyle,
        songListTableStyle,
        is_audio_play_ing_data(`${props.data.id}_${props.data.source_type}`) && 'ing'
      )}
      onClick={() => audioPlay(props.data)}
      onContextMenu={() => props.onContextMenu && props.onContextMenu(props.data)}
    >
      <div class="mod song">
        <img class="icon" src={props.data.song_img_url} />
        <div class="info">
          <div class={cx('name', textEllipsis)}>{props.data.song_name}</div>
          <div class={cx('artists', textEllipsis)}>
            <MusicIcon class="icon" type={props.data.source_type} />
            {props.data.artists.map((e) => e.name).join(',')}
          </div>
        </div>
        <Show when={props.online}>
          <SheetAddIcon
            class="add"
            onClick={(e) => {
              e.stopPropagation();
              props.onAddClick && props.onAddClick(unwrap(props.data));
            }}
          />
        </Show>
      </div>
      <div class={cx('mod album', textEllipsis)}>{props.data.album.name || '-'}</div>
      <div class="mod">{formatTime(props.data.song_time)}</div>
    </div>
  );
};

const songListStyle = css`
  width: 100%;
  padding-top: 25px;
  height: calc(100% - var(--size-img));
  --size-title: 28px;
  > .title {
    padding: 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--size-xxxs);
    color: var(--secondary-label-color);
    height: 26px;
  }
  > .list {
    height: calc(100% - var(--size-title)) !important;
    padding: 0 40px;
    > div {
      > div:nth-child(odd) {
        background-color: var(--tertiary-label-color);
        border-radius: var(--size-radius-xs);
      }
    }
  }
  > .null {
    padding-top: 15px;
    font-size: var(--size-xxs);
    color: var(--secondary-label-color);
    text-align: center;
  }
`;

export const SongList = (props: {
  class?: string;
  online?: boolean;
  key?: string;
  songs: SongItem[];
}) => {
  const [show, set_show] = createSignal(false);
  const [songs, set_songs] = createSignal<SongItem[]>([]);
  return (
    <div class={cx(songListStyle, props.class)}>
      <div class={cx('title', songListTableStyle)}>
        <div class="mod">歌曲</div>
        <div class="mod">专辑</div>
        <div class="mod">时长</div>
      </div>
      <Show when={props.songs.length} fallback={<div class="null">暂无歌曲</div>}>
        <VList class={cx('list', scrollYStyle)} data={props.songs}>
          {(item) => (
            <SongListItem
              online={props.online}
              data={item}
              onAddClick={(song) => {
                set_songs([song]);
                set_show(true);
              }}
              onContextMenu={(song) => {
                menuSong(unwrap(song), props.key);
              }}
            />
          )}
        </VList>
      </Show>
      <SheetAdd onClick={() => set_show(false)} visible={show()} songs={songs()} />
    </div>
  );
};
