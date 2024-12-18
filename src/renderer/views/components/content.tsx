import { css } from '@emotion/css';
import Audio from './audio';
import { Show } from 'solid-js';
import { content_route_path, content_view, set_content_route_path } from '@/renderer/store/content';
import { Dynamic } from 'solid-js/web';

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
    padding-bottom: 10px;
    overflow: hidden;
    overflow-y: auto;
  }
`;

set_content_route_path('play_list_details');

export default () => {
  return (
    <div class={style}>
      <div class="head"></div>
      <div class="content">
        <Show when={!!content_route_path()}>
          <Dynamic component={content_view()} />
        </Show>
      </div>
      <Audio />
    </div>
  );
};
