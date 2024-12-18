import { windowShow } from '@youliso/electronic/render';
import { audioOn } from '@/renderer/store/audio';
import { onMount } from 'solid-js';
import { css } from '@emotion/css';

import Head from '../components/head';
import Menu from '../components/menu';
import Content from '../components/content';

const style = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export default () => {
  onMount(() => {
    audioOn();
    windowShow();
  });

  return (
    <div class="container">
      <Head />
      <div class={style}>
        <Menu />
        <Content />
      </div>
    </div>
  );
};
