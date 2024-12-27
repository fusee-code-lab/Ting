import { css, cx } from '@emotion/css';
import { type JSX } from 'solid-js';
import { nodragStyle } from '@/renderer/views/styles';

const defaultStyle = css`
  outline: none;
  border: none;
  padding: 4px 8px;
  border-radius: 3px;
`;

const defaultItemStyle = css`
  outline: none;
  border: none;
`;

export const SelectItem = (props: {
  class?: string;
  style?: { [key: string]: string };
  value?: string | number;
  children?: JSX.Element;
}) => {
  return (
    <option
      style={props.style}
      class={cx(nodragStyle, defaultItemStyle, props.class)}
      value={props.value}
    >
      {props.children}
    </option>
  );
};

export const Select = (props: {
  disabled?: boolean;
  class?: string;
  style?: { [key: string]: string };
  placeholder?: string;
  value?: string | number;
  onChange?: (
    e: Event & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) => void;
  children?: JSX.Element;
}) => {
  return (
    <select
      style={props.style}
      class={cx(nodragStyle, defaultStyle, props.class)}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    >
      {props.children}
    </select>
  );
};
