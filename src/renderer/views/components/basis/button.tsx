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
  transition: background-color 0.2s;
  &:disabled {
    opacity: 0.5;
  }
`;

// TODO: global palette
const styles = {
  default: css`
    background-color: #f5f5f5;
    color: var(--label-color);

    &:not(:disabled) {
      &:hover {
        background-color: #ededed;
      }
      &:active {
        background-color: #e0e0e0;
      }
    }
  `,
  primary: css`
    background-color: var(--blue-color);
    color: var(--white-color);
    &:not(:disabled) {
      &:hover {
        background-color: #4e8ced;
      }
      &:active {
        background-color: #0f6cbd;
      }
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
  `
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
  return (
    <button
      class={cx(
        nodragStyle,
        defaultStyle,
        styles[props.type || 'default'],
        sizeStyles[props.size || 'normal'],
        props.class
      )}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
