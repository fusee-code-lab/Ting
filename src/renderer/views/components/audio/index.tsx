import { audio_status } from '@/renderer/store/audio';
import { css } from '@emotion/css';

const style = css`
  height: var(--audio-height);
`;

export default () => {
  return <div class={style}>{JSON.stringify(audio_status)}</div>;
};
