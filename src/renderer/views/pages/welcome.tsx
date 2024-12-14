import { RouteSectionProps } from '@solidjs/router';
import { windowShow } from '@youliso/electronic/render';
import { onMount } from 'solid-js';
import { dragStyle, nodragStyle } from '../styles';
import { css, cx } from '@emotion/css';
import { OS } from '@/renderer/store';

import logo_img from '@/assets/logo.png';
import Button from '../components/basis/button';
import { Visual } from '@/renderer/common/visual';

const bgStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const wlStyle = css`
  right: 0;
  > .content {
    align-items: flex-end;
    padding-right: 30px;

    > .title {
      text-align: right;
    }
  }
`;

const macStyle = css`
  left: 0;
  > .content {
    align-items: flex-start;
    padding-left: 30px;

    > .title {
      text-align: left;
    }
  }
`;

const mainStyle = css`
  ${OS === 'mac' ? macStyle : wlStyle}
  position: absolute;
  top: 0;
  bottom: 0;
  width: 270px;
  background-color: var(--basic-color-a1);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > img {
      width: 20%;
    }

    > .title {
      margin-top: 20px;
      height: 40px;
      line-height: 40px;
      font-size: var(--size-xxxl);
      font-weight: 600;
      letter-spacing: 1px;
      color: var(--blue-color);
    }

    > .but {
      margin-top: 30px;
      width: 90px;
      height: 30px;
      line-height: 30px;
      background-color: var(--blue-color);
      color: var(--white-color);
      font-size: var(--size-xxs);
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;

const onCanvas = (el: HTMLCanvasElement) => {
  el && new Visual(el, 'blue');
};

export default (props: RouteSectionProps) => {
  onMount(() => windowShow());

  return (
    <div class="container">
      <canvas class={cx(nodragStyle, bgStyle)} ref={onCanvas}></canvas>
      <div class={cx(dragStyle, mainStyle)}>
        <div class="content">
          <img src={logo_img} />
          <div class="title">
            欢迎来到
            <span style="margin-left: 10px">Ting</span>
          </div>
          <Button class="but">开始</Button>
        </div>
      </div>
    </div>
  );
};
