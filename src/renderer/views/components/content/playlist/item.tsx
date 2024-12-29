import { audioPlay, is_audio_play_ing_data } from '@/renderer/store/audio';
import { scrollYStyle, textEllipsis } from '@/renderer/views/styles';
import { css, cx } from '@emotion/css';
import { SongItem } from '@/types/music';
import { VList } from 'virtua/solid';
import { formatTime } from '@/renderer/common/utils';
import { createSignal, Show } from 'solid-js';
import { SheetAdd, SheetAddIcon } from '../../playlist/sheet_add';
import { unwrap } from 'solid-js/store';

const songListTableStyle = css`
  > div {
    &:nth-child(1) {
      padding-left: 20px;
      width: 35%;
    }
    &:nth-child(2),
    &:nth-child(3) {
      padding-left: 20px;
      width: 25%;
    }
    &:nth-child(4) {
      width: 15%;
      text-align: center;
    }
  }
`;

const songListItemStyle = css`
  display: flex;
  align-items: center;
  height: 40px;
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
    --size-img: 25px;
    > .img {
      width: var(--size-img);
      height: var(--size-img);
    }
    > .name {
      padding-left: 10px;
      width: calc(100% - var(--size-img));
    }
    > .add {
      position: absolute;
      right: 5px;
      display: none;
    }
  }
`;

const SongListItem = (props: {
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
    >
      <div class="mod song">
        <img class="img" src={props.data.song_img_url} />
        <div class={cx('name', textEllipsis)}>{props.data.song_name}</div>
        <SheetAddIcon
          class="add"
          onClick={(e) => {
            e.stopPropagation();
            props.onAddClick && props.onAddClick(unwrap(props.data));
          }}
        />
      </div>
      <div class={cx('mod artists', textEllipsis)}>
        {props.data.artists.map((e) => e.name).join(',')}
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

export const SongList = (props: { class?: string; online?: boolean; songs: SongItem[] }) => {
  const [show, set_show] = createSignal(false);
  const [songs, set_songs] = createSignal<SongItem[]>([]);
  return (
    <div class={cx(songListStyle, props.class)}>
      <div class={cx('title', songListTableStyle)}>
        <div class="mod">歌曲</div>
        <div class="mod">艺人</div>
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
            />
          )}
        </VList>
      </Show>
      <SheetAdd onClick={() => set_show(false)} visible={show()} songs={songs()} />
    </div>
  );
};
