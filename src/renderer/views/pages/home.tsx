import { type RouteSectionProps } from '@solidjs/router';
import { windowShow } from '@youliso/electronic/render';
import { createSignal, Index, onMount, Show } from 'solid-js';
import { containerStyle } from '../styles';
import { css } from '@emotion/css';

const style = css`
  overflow: hidden;
  overflow-y: auto;
  height: calc(100% - 25px);
`;

export default (props: RouteSectionProps) => {
  onMount(() => windowShow());

  return <div class={containerStyle}></div>;
};
