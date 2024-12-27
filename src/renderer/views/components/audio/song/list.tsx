import { audio_play_index, audio_play_list_data } from '@/renderer/store/audio';
import { css, cx } from '@emotion/css';
import { createSignal, Show } from 'solid-js';
import { VirtualizerHandle, VList } from 'virtua/solid';
import { MenuIcon } from '../../basis/icons';
import { SongListItem } from './item';
import { scrollYStyle } from '@/renderer/views/styles';

const list_style = css`
  position: fixed;
  left: var(--menu-width);
  right: 0;
  top: 0;
  bottom: var(--audio-height);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  > .content {
    width: 300px;
    height: 60vh;
    background-color: var(--menu-bg-color);
    border-top-left-radius: var(--size-radius-xs);
    > .v-list {
      padding: 6px;
    }
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
        <div class={list_style} onClick={() => set_show(false)}>
          <div class="content" onClick={(e) => e.stopPropagation()}>
            <VList ref={vHandler} class={cx('v-list', scrollYStyle)} data={audio_play_list_data}>
              {(item) => <SongListItem data={item} />}
            </VList>
          </div>
        </div>
      </Show>
      <div class={cx(icon_style, show() && 'show')} onClick={show_menu}>
        <MenuIcon />
      </div>
    </>
  );
};
