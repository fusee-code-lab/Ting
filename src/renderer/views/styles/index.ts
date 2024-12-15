import { css, injectGlobal } from '@emotion/css';
import { themeStyle } from './theme';

export const dragStyle = css`
  -webkit-app-region: drag;
`;

export const nodragStyle = css`
  -webkit-app-region: no-drag;
`;

injectGlobal`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  ${themeStyle}
  
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
