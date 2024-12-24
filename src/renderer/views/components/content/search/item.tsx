import { css, cx } from '@emotion/css';
import { textEllipsis } from '../../../styles';
import { Match, Show, Switch } from 'solid-js';
import { audioPlay, is_audio_play_ing_data } from '@/renderer/store/audio';
import type { SongItem } from '@/types/music';
import { playlist_list_data_load } from '@/renderer/store/playlist';

const style = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  &.ing {
    color: var(--blue-color);
  }

  > .img {
    width: 100%;
    height: var(--size-img);
    border-radius: var(--size-radius-xs);
    object-fit: cover;
  }

  > .title {
    ${textEllipsis}
    width: 100%;
    font-size: var(--size-xxs);
    line-height: var(--title-height);
    height: var(--title-height);
  }
  > .text {
    ${textEllipsis}
    width: 100%;
    font-size: var(--size-xxxs);
    color: var(--secondary-label-color);
    line-height: var(--text-height);
    height: var(--text-height);
  }
`;

const onClickItem = (data: SongItem) => {
  audioPlay(data);
};

export const Item = (props: { class?: string; data: SongItem }) => {
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
      <div class="title">{props.data.song_name}</div>
      <div class="text">{props.data.song_desc}</div>
    </div>
  );
};
export const PlaylistItem = (props: { class?: string; data: any }) => {
  return (
    <div onClick={() => playlist_list_data_load(props.data.id)} class={cx(style, props.class)}>
      <Show when={!!props.data.id}>
        <img class="img" src={`${props.data.coverImgUrl}?max_age=2592000`} />
        <div class="title">{props.data.name}</div>
        <div class="text">{props.data.description}</div>
      </Show>
    </div>
  );
};
