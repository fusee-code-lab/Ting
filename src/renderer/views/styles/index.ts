import { css } from '@emotion/css';
import './theme';

export const dragStyle = css`
  -webkit-app-region: drag;
`;

export const nodragStyle = css`
  -webkit-app-region: no-drag;
`;

export const textEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const scrollYStyle = css`
  width: calc(100% - 2px) !important;
  overflow: hidden;
  overflow-y: auto;
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    backdrop-filter: blur(10px);
    background: transparent;
    border-radius: var(--size-radius-xs);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);*/
    background: transparent;
  }
`;
