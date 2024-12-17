import { audio_play_data } from '@/renderer/store/audio';
import { css } from '@emotion/css';
import { Show } from 'solid-js';
import { SongItem } from 'ting-lib/src/types/music';
import { Control } from './control';

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--audio-height);
  padding: 0 30px;
  box-shadow: 0px 0px 31px -11px rgba(0, 0, 0, 0.19);
  > .left {
    width: 25%;
  }
  > .center {
    width: 50%;
  }
  > .right {
    width: 25%;
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
        <div class="name">{props.data.song_name}</div>
        <div class="artists">{props.data.artists.map((e) => e.name).join(',')}</div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <Show when={audio_play_data() != undefined}>
      <div class={style}>
        <div class="left">
          <AudioInfo data={audio_play_data()!} />
        </div>
        <div class="center">
          <Control />
        </div>
        <div class="right"></div>
      </div>
    </Show>
  );
};
