import { audio_play_data, audio_status } from '@/renderer/store/audio';
import { css } from '@emotion/css';
import { Show } from 'solid-js';

const style = css`
  height: var(--audio-height);
  box-shadow: 0px 0px 31px -11px rgba(0, 0, 0, 0.19);
`;

export default () => {
  return (
    <Show when={audio_play_data() != undefined}>
      <div class={style}>{audio_play_data()?.song_name}</div>
    </Show>
  );
};
