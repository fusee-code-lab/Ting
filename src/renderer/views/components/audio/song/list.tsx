import { audio_play_index, audio_play_list_data } from '@/renderer/store/audio';
import { css, cx } from '@emotion/css';
import { createSignal, Show } from 'solid-js';
import { VirtualizerHandle, VList } from 'virtua/solid';
import { MenuIcon } from '../../basis/icons';
import { SongListItem } from './item';

const list_style = css`
  position: fixed;
  right: 0;
  width: 300px;
  height: 60vh;
  bottom: var(--audio-height);
  background-color: var(--menu-bg-color);
  border-top-left-radius: var(--size-radius-xs);
  > .content {
    padding: 6px;
  }
`;

const icon_style = css`
  --size: 20px;
  width: var(--size);
  height: var(--size);

  &.show > span {
    color: var(--blue-color);
  }

  > span {
    font-size: var(--size);
  }
`;

export const SongList = () => {
  const [show, set_show] = createSignal(false);

  let handler: VirtualizerHandle | null = null;

  const vHandler = (e?: VirtualizerHandle) => {
    e && (handler = e);
  };

  const show_menu = () => {
    const is_show = show();
    set_show(!is_show);
    if (handler && !is_show) {
      handler.scrollToIndex(audio_play_index());
    }
  };

  return (
    <>
      <Show when={show()}>
        <div class={list_style}>
          <VList ref={vHandler} class="content" data={audio_play_list_data}>
            {(item) => <SongListItem data={item} />}
          </VList>
        </div>
      </Show>
      <div class={cx(icon_style, show() && 'show')} onClick={show_menu}>
        <MenuIcon />
      </div>
    </>
  );
};
