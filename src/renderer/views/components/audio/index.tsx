import { audio_play_list_data, audio_play_index } from '@/renderer/store/audio';
import { css, cx } from '@emotion/css';
import { Show } from 'solid-js';
import type { SongItem } from '@fuseecodelab/ting-lib';
import { Control } from './control';
import { textEllipsis } from '../../styles';

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--audio-height);
  padding: 0 30px;
  box-shadow: 0px 0px 31px -11px rgba(0, 0, 0, 0.19);
  > div {
    height: 100%;
  }
  > .left {
    width: 40%;
  }
  > .center {
    padding-left: 15px;
    width: 45%;
  }
  > .right {
    width: 15%;
  }
`;

const audio_info_style = css`
  height: 100%;
  display: flex;
  align-items: center;
  --size-wh: 35px;
  > .icon {
    width: var(--size-wh);
    height: var(--size-wh);
    object-fit: cover;
    border-radius: var(--size-radius-xs);
  }
  > .info {
    width: calc(100% - var(--size-wh));
    padding-left: 10px;
    > .name {
      font-size: var(--size-xxs);
    }
    > .artists {
      font-size: var(--size-xxxs);
      color: var(--secondary-label-color);
    }
  }
`;
const AudioInfo = (props: { data: SongItem }) => {
  return (
    <div class={audio_info_style}>
      <img class="icon" src={props.data.song_img_url} />
      <div class="info">
        <div class={cx('name', textEllipsis)}>{props.data.song_name}</div>
        <div class={cx('artists', textEllipsis)}>
          {props.data.artists.map((e) => e.name).join(',')}
        </div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <div class={style}>
      <Show when={audio_play_index() != -1}>
        <div class="left">
          <AudioInfo data={audio_play_list_data[audio_play_index()]!} />
        </div>
        <div class="center">
          <Control />
        </div>
        <div class="right"></div>
      </Show>
    </div>
  );
};
