import { css, cx } from '@emotion/css';
import { textEllipsis } from '../../styles';
import { Match, Switch } from 'solid-js';
import { audioPlay, set_audio_play_list_details_data } from '@/renderer/store/audio';
import type { MusicType, SongItem } from '@fuseecodelab/ting-lib';
import { set_content_route_path } from '@/renderer/store/content';
import { playlist_detail } from '@/renderer/common/music';

const style = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  > .img {
    width: 100%;
    height: var(--size-img);
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
    <div onClick={() => onClickItem(props.data)} class={cx(style, props.class)}>
      <Switch>
        <Match when={props.data.source_type === 'netease'}>
          <img class="img" src={`${props.data.song_img_url}?param=120y120`} />
        </Match>
        <Match when={props.data.source_type === 'qq'}>
          <img class="img" src={`${props.data.song_img_url}?max_age=2592000`} />
        </Match>
      </Switch>
      <div class="title">{props.data.song_name}</div>
      <div class="text">{props.data.song_desc}</div>
    </div>
  );
};

const onClickPlaylist = async (type: MusicType, id: string) => {
  const res = await playlist_detail(type, id);
  if (res) {
    set_audio_play_list_details_data('source_type', type);
    set_audio_play_list_details_data('data', res);
    set_content_route_path('play_list_details');
  }
};
export const PlaylistItem = (props: { class?: string; data: any }) => {
  return (
    <div
      onClick={() =>
        onClickPlaylist(props.data.dissid ? 'qq' : 'netease', props.data.dissid || props.data.id)
      }
      class={cx(style, props.class)}
    >
      <Switch>
        <Match when={!!props.data.id}>
          <img class="img" src={`${props.data.coverImgUrl}?max_age=2592000`} />
          <div class="title">{props.data.name}</div>
          <div class="text">{props.data.description}</div>
        </Match>
        <Match when={!!props.data.dissid}>
          <img class="img" src={`${props.data.imgurl}?max_age=2592000`} />
          <div class="title">{props.data.dissname}</div>
          <div class="text">{props.data.introduction}</div>
        </Match>
      </Switch>
    </div>
  );
};
