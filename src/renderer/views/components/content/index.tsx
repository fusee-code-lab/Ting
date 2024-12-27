import { css, cx } from '@emotion/css';
import { Show } from 'solid-js';
import { content_router, content_view } from '@/renderer/store/content';
import { Dynamic } from 'solid-js/web';
import Audio from '../audio';

import rocket_icon from '@/assets/rocket.png';

const style = css`
  position: relative;
  width: calc(100% - var(--menu-width));
  > .head {
    width: calc(100% - var(--event-width));
    height: var(--head-height);
    line-height: var(--head-height);
    padding: 0 10px;
    font-size: var(--size-xxxs);
  }
  > .content {
    height: calc(100% - var(--head-height) - var(--audio-height));
    > .null {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 80%;
        height: 80%;
        object-fit: contain;
        filter: blur(1px) grayscale(30%) opacity(30%);
      }
    }
  }
`;

const Null = () => (
  <div class="null">
    <img src={rocket_icon} />
  </div>
);

export default () => {
  return (
    <div class={style}>
      <div class="head"></div>
      <div class="content">
        <Show when={!!content_router.path} fallback={<Null />}>
          <Dynamic component={content_view()} />
        </Show>
      </div>
      <Audio />
    </div>
  );
};
