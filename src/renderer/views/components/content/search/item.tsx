import { css, cx } from '@emotion/css';
import { textEllipsis } from '../../../styles';
import { Match, Switch } from 'solid-js';
import { audioPlay, is_audio_play_ing_data } from '@/renderer/store/audio';
import type { PlayListItem, SongItem } from '@/types/music';
import { playlist_online_load } from '@/renderer/store/playlist';
import { unwrap } from 'solid-js/store';
import { SheetAddIcon } from '../../playlist/sheet_add';
import { MusicIcon } from '../../basis/music_icon';

const style = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &.ing {
    color: var(--blue-color);
  }

  &:hover {
    > .add {
      display: flex;
    }
  }

  > .img {
    width: 100%;
    height: var(--size-img);
    border-radius: var(--size-radius-xs);
    object-fit: cover;
  }

  > .title {
    width: 100%;
    font-size: var(--size-xxs);
    line-height: var(--title-height);
    height: var(--title-height);
  }
  > .text {
    width: 100%;
    font-size: var(--size-xxxs);
    color: var(--secondary-label-color);
    line-height: var(--text-height);
    height: var(--text-height);
    > .icon {
      width: var(--size-xxxs);
      height: var(--size-xxxs);
      margin-right: 5px;
    }
  }

  > .add {
    position: absolute;
    right: 5px;
    bottom: calc(var(--text-height) + var(--title-height) + 5px);
    display: none;
  }
`;

const onClickItem = (data: SongItem) => {
  audioPlay(data);
};

export const Item = (props: {
  onAddClick?: (song: SongItem) => void;
  class?: string;
  data: SongItem;
}) => {
  return (
    <div
      onClick={() => onClickItem(props.data)}
      class={cx(
        style,
        props.class,
        is_audio_play_ing_data(`${props.data.id}_${props.data.source_type}`) && 'ing'
      )}
    >
      <Switch>
        <Match when={props.data.source_type === 'netease'}>
          <img class="img" src={`${props.data.song_img_url}?param=120y120`} />
        </Match>
        <Match when={props.data.source_type === 'qq'}>
          <img class="img" src={`${props.data.song_img_url}?max_age=2592000`} />
        </Match>
      </Switch>
      <div class={cx('title', textEllipsis)}>{props.data.song_name}</div>
      <div class={cx('text', textEllipsis)}>
        <MusicIcon class="icon" type={props.data.source_type} />
        {props.data.song_desc}
      </div>
      <SheetAddIcon
        class="add"
        onClick={(e) => {
          e.stopPropagation();
          props.onAddClick && props.onAddClick(unwrap(props.data));
        }}
      />
    </div>
  );
};
export const PlaylistItem = (props: { class?: string; data: PlayListItem }) => {
  return (
    <div
      onClick={() => playlist_online_load(props.data.source_type, props.data.playlist_id)}
      class={cx(style, props.class)}
    >
      <Switch>
        <Match when={props.data.source_type === 'netease'}>
          <img class="img" src={`${props.data.coverImgUrl}?param=2592000`} />
          <div class={cx('title', textEllipsis)}>{props.data.name}</div>
          <div class={cx('text', textEllipsis)}>
            <MusicIcon class="icon" type="netease" />
            {props.data.description}
          </div>
        </Match>
        <Match when={props.data.source_type === 'qq'}>
          <img class="img" src={`${props.data.imgurl}?max_age=120y120`} />
          <div class={cx('title', textEllipsis)}>{props.data.dissname}</div>
          <div class={cx('text', textEllipsis)}>
            <MusicIcon class="icon" type="qq" />
            {props.data.introduction}
          </div>
        </Match>
      </Switch>
    </div>
  );
};
