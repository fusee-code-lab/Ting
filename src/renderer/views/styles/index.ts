import { css, injectGlobal } from '@emotion/css';
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

injectGlobal`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
  
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }
  
  .container {
    user-select: none;
    width: 100%;
    height: 100%;
    background-color: var(--basic-color);
    color: var(--symbol-color);
  }
`;
