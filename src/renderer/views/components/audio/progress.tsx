import { css } from '@emotion/css';
import Input from '../basis/input';
import { createSignal } from 'solid-js';
import { audio_status, audioSetCurrentIngTime, audioSetCurrentTime } from '@/renderer/store/audio';

const style = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  height: 5px;

  &:hover > .progress-input::-webkit-slider-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: all 0.15s ease-in-out;
  }
  > .progress-input {
    background: var(--audio-progres);
    width: 100%;
    height: 2px;
    padding: 0;
    margin: 0;
    outline: 0;
    appearance: none !important;
    top: 0;
    position: absolute;

    &::-webkit-slider-thumb {
      transition: all 0.15s ease-in-out;
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: var(--blue-color);
      -webkit-appearance: none !important;
    }

    &::-webkit-slider-thumb:active {
      border: 0;
      background-color: var(--blue-color);
    }
  }
`;

let onProgressInt: number | null = null;
export const Progress = () => {
  const [speed_progress, set_speed_progress] = createSignal(0);
  const [is_progress, set_is_progress] = createSignal(false);

  const onProgress = () => {
    //拖动后延迟0.1秒后显示
    onProgressInt && window.clearTimeout(onProgressInt);
    onProgressInt = window.setTimeout(() => {
      set_is_progress(false);
    }, 100);
  };

  return (
    <div class={style}>
      <Input
        type="range"
        class="progress-input"
        style={{
          '--audio-progres': `linear-gradient(to right, var(--blue-color) ${
            is_progress()
              ? (speed_progress() / Number(audio_status.allTime.toFixed(0))) * 100
              : (audio_status.ingTime / Number(audio_status.allTime.toFixed(0))) * 100
          }%, transparent 0%)`
        }}
        max={Number(audio_status.allTime.toFixed(0))}
        min={0}
        step="any"
        onMouseUp={() => {
          audio_status.type === 0
            ? audioSetCurrentIngTime(speed_progress())
            : audioSetCurrentTime(speed_progress());
          onProgress();
        }}
        onMouseDown={() => set_is_progress(true)}
        onInput={(e) => set_speed_progress(Number((e.currentTarget as HTMLInputElement).value))}
        value={is_progress() ? speed_progress() : audio_status.ingTime}
      />
    </div>
  );
};
