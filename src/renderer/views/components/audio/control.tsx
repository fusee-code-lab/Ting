import { css } from '@emotion/css';
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PreviousIcon,
  RepeatIcon,
  ShuffleIcon,
  Volumes1Icon,
  Volumes2Icon,
  Volumes3Icon
} from '@/renderer/views/components/basis/icons';
import {
  audio_type,
  audio_status,
  audioNext,
  audioSetVolume,
  set_audio_type,
  set_audio_status
} from '@/renderer/store/audio';
import { Match, Switch } from 'solid-js';
import { audio } from '@/renderer/store/audio';
import Input from '../basis/input';

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

  > .volume {
    width: 140px;
    --size-icon: 25px;
    > .volume-icon {
      width: var(--size-icon);
      height: var(--size-icon);
      > span {
        font-size: var(--size-icon);
      }
    }

    > .volume-input {
      background: var(--audio-volume);
      width: calc(100% - var(--size-icon));
      height: 4px;
      margin: 0 0 0.67px;
      padding: 0;
      outline: 0;
      border-radius: var(--size-radius-xs);
      appearance: none !important;

      &::-webkit-slider-thumb {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: var(--blue-color);
        appearance: none !important;
      }

      &::-webkit-slider-thumb:active {
        border: 0;
        background-color: var(--blue-color);
      }
    }
  }

  > .switch {
    > span {
      font-size: 22px;
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }

    &.single {
      > .single {
        color: var(--blue-color);
      }
    }
    &.random {
      > .random {
        color: var(--blue-color);
      }
    }
  }
`;

export const Control = () => {
  const set_type_switch = (type: 'single' | 'random') => {
    if (audio_type() === type) {
      set_audio_type('list');
      return;
    }
    set_audio_type(type);
  };
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
      <div class="volume">
        <div class="volume-icon">
          <Switch>
            <Match when={audio_status.volume <= 30}>
              <Volumes1Icon />
            </Match>
            <Match when={audio_status.volume > 30 && audio_status.volume <= 60}>
              <Volumes2Icon />
            </Match>
            <Match when={audio_status.volume > 60 && audio_status.volume <= 100}>
              <Volumes3Icon />
            </Match>
          </Switch>
        </div>
        <Input
          style={{
            '--audio-volume': `linear-gradient(to right, var(--blue-color) ${audio_status.volume}%, #F2F2F7 0%)`
          }}
          class="volume-input"
          type="range"
          max={100}
          min={0}
          step={1}
          value={audio_status.volume}
          onInput={(e) => audioSetVolume(Number((e.currentTarget as HTMLInputElement).value))}
        />
      </div>
      <div class={`switch ${audio_type()}`}>
        <ShuffleIcon class="random" onClick={() => set_type_switch('random')} />
        <RepeatIcon class="single" onClick={() => set_type_switch('single')} />
      </div>
    </div>
  );
};
