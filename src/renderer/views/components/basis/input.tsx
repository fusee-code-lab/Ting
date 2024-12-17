import { css, cx } from '@emotion/css';
import { type JSX } from 'solid-js';
import { nodragStyle } from '@/renderer/views/styles';

const defaultStyle = css`
  outline: none;
  border: none;
  padding: 4px 8px;
  border-radius: 3px;

  &[type='checkbox'] {
    margin: 0;
  }
`;

const Input = (props: {
  disabled?: boolean;
  class?: string;
  placeholder?: string;
  type?:
    | 'text'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'week'
    | 'time'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'url';
  value?: string;
  onInput?: (e: InputEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onClick?: () => void;
  children?: JSX.Element;
}) => {
  return (
    <input
      class={cx(nodragStyle, defaultStyle, props.class)}
      placeholder={props.placeholder}
      value={props.value ?? ''}
      onInput={props.onInput}
      onKeyDown={props.onKeyDown}
      disabled={props.disabled}
      type={props.type ?? 'text'}
    />
  );
};

export default Input;
