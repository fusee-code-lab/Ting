import { audio_list_data, audio_index } from '@/renderer/store/audio';
import { css } from '@emotion/css';
import { Show } from 'solid-js';
import { Control } from './control';
import { SongInfo } from './song/info';
import { SongList } from './song/list';
import { Progress } from './progress';

const style = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--audio-height);
  padding: 0 30px;
  box-shadow: 0px 0px 31px -11px rgba(0, 0, 0, 0.19);

  --left-w: 36%;
  --left-r: 15%;

  > .left {
    width: var(--left-w);
    height: 100%;
  }
  > .center {
    padding-left: 15px;
    width: calc(100% - var(--left-w) - var(--left-r));
    height: 100%;
  }
  > .right {
    width: var(--left-r);
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export default () => {
  return (
    <div class={style}>
      <Show when={audio_index() != -1} fallback={<div>Ting ~</div>}>
        <Progress />
        <div class="left">
          <SongInfo data={audio_list_data[audio_index()]!} />
        </div>
        <div class="center">
          <Control />
        </div>
        <div class="right">
          <SongList />
        </div>
      </Show>
    </div>
  );
};
