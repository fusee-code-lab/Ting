import { css, cx } from '@emotion/css';
import { type JSX } from 'solid-js';
import { nodragStyle } from '@/renderer/views/styles';

const defaultStyle = css`
  outline: none;
  border: none;
  border-radius: var(--size-radius-xs);
  letter-spacing: 1px;
  font-weight: 500;
  line-height: 1.5;
  transition: background-color .2s;
`;

// TODO: global palette
const styles = {
  default: css`
    background-color: #F5F5F5;
    color: var(--label-color);
    &:hover {
      background-color: #EDEDED;
    }
    &:active {
      background-color: #E0E0E0;
    }
  `,
  primary: css`
    background-color: var(--blue-color);
    color: var(--white-color);
    &:hover {
      background-color: #4E8CED;
    }
    &:active {
      background-color: #0F6CBD;
    }
  `
};

const sizeStyles = {
  large: css`
    padding: 8px 32px;
    font-size: var(--size-sm);
    border-radius: var(--size-radius-lg);
  `,
  normal: css`
    padding: 5px 18px;
    font-size: var(--size-xxs);
    border-radius: var(--size-radius-sm);
  `,
  small: css`
    padding: 2px 12px;
    font-size: var(--size-xxs);
    border-radius: var(--size-radius-xs);
  `,
} as const;

type ButtonSize = keyof typeof sizeStyles;

const Button = (props: {
  disabled?: boolean;
  class?: string;
  type?: 'default' | 'primary';
  size?: ButtonSize;
  onClick?: () => void;
  children?: JSX.Element;
}) => {
  const sizeCss = sizeStyles[props.size || 'normal'];
  const typeCss = styles[props.type || 'default'];
  return (
    <button
      class={cx(nodragStyle, defaultStyle, typeCss, sizeCss, props.class)}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
