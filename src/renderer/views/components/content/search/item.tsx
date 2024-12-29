import { css, cx } from '@emotion/css';
import { textEllipsis } from '../../../styles';
import { Match, Show, Switch } from 'solid-js';
import { audioPlay, is_audio_play_ing_data } from '@/renderer/store/audio';
import type { SongItem } from '@/types/music';
import { playlist_list_online_data_load } from '@/renderer/store/playlist';
import { PlusIcon } from '../../basis/icons';
import { unwrap } from 'solid-js/store';

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
  }

  > .add {
    --size: 16px;
    width: var(--size);
    height: var(--size);
    position: absolute;
    right: 5px;
    bottom: calc(var(--text-height) + var(--title-height) + 5px);
    background-color: var(--basic-color);
    display: none;
    justify-content: center;
    align-items: center;
    border-radius: var(--size-radius-xs);
    > span {
      font-size: 9px;
      font-weight: 600;
      color: var(--symbol-color);
    }
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
      </Switch>
      <div class={cx('title', textEllipsis)}>{props.data.song_name}</div>
      <div class={cx('text', textEllipsis)}>{props.data.song_desc}</div>
      <div
        class="add"
        onClick={(e) => {
          e.stopPropagation();
          props.onAddClick && props.onAddClick(unwrap(props.data));
        }}
      >
        <PlusIcon />
      </div>
    </div>
  );
};
export const PlaylistItem = (props: { class?: string; data: any }) => {
  return (
    <div
      onClick={() => playlist_list_online_data_load(props.data.id)}
      class={cx(style, props.class)}
    >
      <Show when={!!props.data.id}>
        <img class="img" src={`${props.data.coverImgUrl}?max_age=2592000`} />
        <div class={cx('title', textEllipsis)}>{props.data.name}</div>
        <div class={cx('text', textEllipsis)}>{props.data.description}</div>
      </Show>
    </div>
  );
};
