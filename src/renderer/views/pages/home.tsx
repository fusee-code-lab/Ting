import { windowHide, windowShow } from '@youliso/electronic/render';
import { audioOn } from '@/renderer/store/audio';
import { onMount } from 'solid-js';
import { css } from '@emotion/css';

import Head from '../components/head';
import Menu from '../components/menu';
import Content from '../components/content';
import { isProduction } from '@/renderer/store';

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

  if (isProduction) {
    // 禁止点击就关闭
    window.onbeforeunload = (e) => {
      windowHide();
      e.returnValue = false;
    };
  }

  return (
    <div class="container">
      <Head back={true} />
      <div class={style}>
        <Menu />
        <Content />
      </div>
    </div>
  );
};
