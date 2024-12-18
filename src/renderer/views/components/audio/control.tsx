import { css } from '@emotion/css';
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PreviousIcon
} from '@/renderer/views/components/basis/icons';
import { audio_status, audioNext, set_audio_status } from '@/renderer/store/audio';
import { Match, Switch } from 'solid-js';
import { audio } from '@/renderer/store/audio';

const style = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
  }

  > .previous,
  > .next {
    > span {
      font-size: 18px;
    }
  }

  > .pause,
  > .play {
    > span {
      font-size: 20px;
    }
  }
`;

export const Control = () => {
  return (
    <div class={style}>
      <div class="previous" onClick={() => audioNext(-1)}>
        <PreviousIcon />
      </div>
      <Switch>
        <Match when={audio_status.type === 0}>
          <div class="pause" onClick={() => audio.play()}>
            <PauseIcon />
          </div>
        </Match>
        <Match when={audio_status.type === 1}>
          <div
            class="play"
            onClick={() => {
              set_audio_status('type', 0);
              audio.pause();
            }}
          >
            <PlayIcon />
          </div>
        </Match>
      </Switch>
      <div class="next" onClick={() => audioNext(1)}>
        <NextIcon />
      </div>
    </div>
  );
};
