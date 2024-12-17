import { css, cx } from '@emotion/css';

const style = css`
  font-family: 'ting-font' !important;
  font-size: var(--size-xs);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--label-color);
`;

const next = css`
  &::before {
    content: '\\e614';
  }
`;
export const NextIcon = (props: { onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(style, next)} onClick={props.onClick}></span>
);

const previous = css`
  &::before {
    content: '\\e615';
  }
`;
export const PreviousIcon = (props: { onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(style, previous)} onClick={props.onClick}></span>
);

const play = css`
  &::before {
    content: '\\e610';
  }
`;
export const PlayIcon = (props: { onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(style, play)} onClick={props.onClick}></span>
);

const pause = css`
  &::before {
    content: '\\e611';
  }
`;
export const PauseIcon = (props: { onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(style, pause)} onClick={props.onClick}></span>
);
