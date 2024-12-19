import { css, cx } from '@emotion/css';

const style = css`
  font-family: 'ting-font' !important;
  font-size: var(--size-xs);
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--label-color);
`;

const back = css`
  &::before {
    content: '\\e61b';
  }
`;
export const BackIcon = (props: { onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(style, back)} onClick={props.onClick}></span>
);

const menu = css`
  &::before {
    content: '\\e60d';
  }
`;
export const MenuIcon = (props: { onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(style, menu)} onClick={props.onClick}></span>
);

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

const shuffle = css`
  &::before {
    content: '\\e61a';
  }
`;
export const ShuffleIcon = (props: { class?: string; onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(props.class, style, shuffle)} onClick={props.onClick}></span>
);

const repeat = css`
  &::before {
    content: '\\e612';
  }
`;
export const RepeatIcon = (props: { class?: string; onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(props.class, style, repeat)} onClick={props.onClick}></span>
);

const volumes = [
  css`
    &::before {
      content: '\\e618';
    }
  `,
  css`
    &::before {
      content: '\\e617';
    }
  `,
  css`
    &::before {
      content: '\\e619';
    }
  `
];

export const Volumes1Icon = (props: { class?: string; onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(props.class, style, volumes[0])} onClick={props.onClick}></span>
);

export const Volumes2Icon = (props: { class?: string; onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(props.class, style, volumes[1])} onClick={props.onClick}></span>
);

export const Volumes3Icon = (props: { class?: string; onClick?: (e: MouseEvent) => void }) => (
  <span class={cx(props.class, style, volumes[2])} onClick={props.onClick}></span>
);
