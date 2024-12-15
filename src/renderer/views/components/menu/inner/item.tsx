import { css, cx } from '@emotion/css';

import play_list_icon from '@/assets/icons/play_list_icon.png';
import play_list_icon2x from '@/assets/icons/play_list_icon@2x.png';

const titleStyle = css`
  font-size: var(--size-xxxs);
  color: var(--title-label-color);
`;

export const ItemTitle = (props: { class?: string; title: string }) => {
  return <div class={cx(titleStyle, props.class)}>{props.title}</div>;
};

const itemStyle = css`
  display: flex;
  align-items: center;
  height: 20px;
  --icon-size: 14 px;
  > .icon {
    width: var(--icon-size);
    height: var(--icon-size);
    object-fit: contain;
  }
  > .title {
    width: calc(100% - var(--icon-size));
    padding-left: 6px;
    font-size: var(--size-xxxs);
    line-height: var(--size-xxs);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
export const Item = (props: { class?: string; title: string }) => {
  return (
    <div class={cx(itemStyle, props.class)}>
      <img
        class="icon"
        srcset={`${play_list_icon} 1x, ${play_list_icon2x} 2x`}
        src={play_list_icon2x}
      />
      <div class="title">{props.title}</div>
    </div>
  );
};
