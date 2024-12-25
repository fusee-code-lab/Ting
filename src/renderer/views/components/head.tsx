import { css, cx } from '@emotion/css';
import { dragStyle, nodragStyle } from '../styles';
import { BackIcon } from './basis/icons';
import { back_content_route, content_router } from '@/renderer/store/content';
import { Show } from 'solid-js';

const style = css`
  position: fixed;
  z-index: 98;
  top: 0;
  left: var(--menu-width);
  right: 0;
  height: var(--head-height);
  width: calc(100% - var(--event-width) - var(--menu-width));
  padding-left: 15px;
  display: flex;
  align-items: center;
  &.width-all {
    left: 0;
    width: 100%;
  }

  > .back {
    display: flex;
    align-items: center;
    > span {
      font-size: var(--size-xxs);
    }
  }
`;

export default (props: { back?: boolean; widthAll?: boolean }) => {
  return (
    <div class={cx(style, dragStyle, props.widthAll && 'width-all')}>
      <Show when={props.back && content_router.history.length}>
        <div class={cx('back', nodragStyle)} onClick={() => back_content_route()}>
          <BackIcon />
        </div>
      </Show>
    </div>
  );
};
