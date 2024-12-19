import { css } from '@emotion/css';
import { SongList } from './item';
import { Details } from './details';

const style = css`
  height: 100%;
  --size-img: 180px;
`;

export default () => (
  <div class={style}>
    <Details />
    <SongList />
  </div>
);
