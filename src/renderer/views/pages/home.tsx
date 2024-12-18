import { type RouteSectionProps } from '@solidjs/router';
import { windowShow } from '@youliso/electronic/render';
import { onMount } from 'solid-js';
import { css } from '@emotion/css';

import Head from '../components/head';
import Menu from '../components/menu';
import Content from '../components/content';
import { audioOn } from '@/renderer/store/audio';

const style = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export default (props: RouteSectionProps) => {
  onMount(() => {
    audioOn();
    windowShow();
  });

  return (
    <div class="container">
      <Head title={window.customize.title ?? ''} />
      <div class={style}>
        <Menu />
        <Content />
      </div>
    </div>
  );
};
